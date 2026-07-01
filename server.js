const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = __dirname;
const MAX_BODY_BYTES = 32 * 1024;
const BOOKING_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

if (typeof process.loadEnvFile === 'function') {
  const envPath = path.join(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    process.loadEnvFile(envPath);
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8'
};

class HttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function numberFromEnv(value, fallback, min, max) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

function getConfig(overrides = {}) {
  return {
    port: numberFromEnv(process.env.PORT, 8080, 1, 65535),
    ghlBaseUrl: process.env.GHL_BASE_URL || GHL_BASE_URL,
    ghlToken: process.env.GHL_PRIVATE_INTEGRATION_TOKEN || '',
    locationId: process.env.GHL_LOCATION_ID || '',
    formId: process.env.GHL_FORM_ID || '',
    calendarId: process.env.GHL_CALENDAR_ID || '',
    amandaUserId: process.env.GHL_AMANDA_USER_ID || '',
    bookingDurationMinutes: numberFromEnv(process.env.GHL_BOOKING_DURATION_MINUTES, 90, 15, 480),
    slotsWindowDays: numberFromEnv(process.env.GHL_SLOTS_WINDOW_DAYS, 14, 1, 31),
    bookingSecret: process.env.BOOKING_SESSION_SECRET || '',
    ...overrides
  };
}

function sendJson(res, status, payload, headers = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    ...headers
  });
  res.end(body);
}

function sendApiError(res, error) {
  const status = error instanceof HttpError ? error.status : 500;
  const code = error instanceof HttpError ? error.code : 'internal_error';
  const message = error instanceof HttpError
    ? error.message
    : 'No pudimos completar la solicitud. Inténtalo nuevamente.';
  sendJson(res, status, { ok: false, error: code, message });
}

function getClientIp(req) {
  return req.socket.remoteAddress || 'unknown';
}

function createRateLimiter() {
  const buckets = new Map();

  return function allow(key, limit, windowMs, now = Date.now()) {
    const current = buckets.get(key);
    if (!current || current.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    if (current.count >= limit) return false;
    current.count += 1;
    return true;
  };
}

function readJsonBody(req, maxBytes = MAX_BODY_BYTES) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];

    req.on('data', chunk => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new HttpError(413, 'payload_too_large', 'La solicitud es demasiado grande.'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (size === 0) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(new HttpError(400, 'invalid_json', 'Los datos enviados no son válidos.'));
      }
    });

    req.on('error', reject);
  });
}

function assertSameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return;
  const forwardedProto = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim();
  const protocol = forwardedProto || (req.socket.encrypted ? 'https' : 'http');
  const expectedOrigin = `${protocol}://${req.headers.host}`;
  if (origin !== expectedOrigin) {
    throw new HttpError(403, 'invalid_origin', 'Origen de solicitud no permitido.');
  }
}

function assertIntegrationConfig(config, fields) {
  const missing = fields.filter(field => !config[field]);
  if (missing.length) {
    throw new HttpError(503, 'integration_not_configured', 'La integración todavía no está configurada.');
  }
}

function sanitizeTimezone(value, fallback = 'America/Los_Angeles') {
  const timezone = typeof value === 'string' && value.length <= 80 ? value : fallback;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone }).format(new Date());
    return timezone;
  } catch {
    return fallback;
  }
}

function normalizePhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  const national = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (!/^\d{10}$/.test(national)) {
    throw new HttpError(422, 'invalid_phone', 'Ingresa un número móvil válido de 10 dígitos.');
  }
  return `+1${national}`;
}

function validateRegistration(input) {
  const name = String(input.name || '').trim().replace(/\s+/g, ' ');
  const email = String(input.email || '').trim().toLowerCase();
  const tcpaConsent = input.tcpaConsent === true || input.tcpa_consent === true;
  const abVariant = String(input.abVariant || input.ab_variant || 'A').trim();

  if (name.length < 2 || name.length > 100) {
    throw new HttpError(422, 'invalid_name', 'Ingresa tu nombre completo.');
  }
  if (email.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError(422, 'invalid_email', 'Ingresa un correo electrónico válido.');
  }
  if (!tcpaConsent) {
    throw new HttpError(422, 'consent_required', 'Debes aceptar el consentimiento para completar el registro.');
  }
  if (!/^[A-Za-z0-9_-]{1,20}$/.test(abVariant)) {
    throw new HttpError(422, 'invalid_variant', 'La variante de registro no es válida.');
  }

  const parts = name.split(' ');
  return {
    name,
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
    email,
    phone: normalizePhone(input.phone),
    tcpaConsent,
    abVariant,
    timezone: sanitizeTimezone(input.timezone)
  };
}

function base64UrlEncode(value) {
  return Buffer.from(value).toString('base64url');
}

function createBookingToken(contactId, secret, now = Date.now()) {
  const payload = {
    v: 1,
    sub: contactId,
    iat: now,
    exp: now + BOOKING_TOKEN_TTL_MS,
    jti: crypto.randomBytes(12).toString('hex')
  };
  const encoded = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

function verifyBookingToken(token, secret, now = Date.now()) {
  if (typeof token !== 'string' || token.length > 2048) {
    throw new HttpError(401, 'invalid_booking_session', 'Tu sesión de reserva no es válida.');
  }
  const [encoded, providedSignature, extra] = token.split('.');
  if (!encoded || !providedSignature || extra) {
    throw new HttpError(401, 'invalid_booking_session', 'Tu sesión de reserva no es válida.');
  }
  const expectedSignature = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');
  const expectedBuffer = Buffer.from(expectedSignature);
  const providedBuffer = Buffer.from(providedSignature);
  if (expectedBuffer.length !== providedBuffer.length || !crypto.timingSafeEqual(expectedBuffer, providedBuffer)) {
    throw new HttpError(401, 'invalid_booking_session', 'Tu sesión de reserva no es válida.');
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
  } catch {
    throw new HttpError(401, 'invalid_booking_session', 'Tu sesión de reserva no es válida.');
  }
  if (payload.v !== 1 || typeof payload.sub !== 'string' || payload.exp <= now) {
    throw new HttpError(401, 'expired_booking_session', 'Tu sesión venció. Regístrate nuevamente para reservar.');
  }
  return payload;
}

async function defaultGhlRequest(config, endpoint, options = {}) {
  assertIntegrationConfig(config, ['ghlToken']);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${config.ghlToken}`,
    Version: options.version || '2021-04-15',
    ...options.headers
  };
  let body;
  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(new URL(endpoint, config.ghlBaseUrl), {
      method: options.method || 'GET',
      headers,
      body,
      signal: controller.signal
    });
    const text = await response.text();
    let data = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text.slice(0, 200) };
      }
    }
    if (!response.ok) {
      const error = new HttpError(502, 'ghl_request_failed', 'GoHighLevel no pudo completar la operación.');
      error.upstreamStatus = response.status;
      throw error;
    }
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new HttpError(504, 'ghl_timeout', 'GoHighLevel tardó demasiado en responder.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function buildConsentNote(registration, req, registeredAt) {
  const userAgent = String(req.headers['user-agent'] || 'No disponible').slice(0, 300);
  return [
    'Consentimiento de registro — Landing Masterclass',
    `Fecha UTC: ${registeredAt}`,
    'Consentimiento TCPA: Sí',
    'Texto aceptado: Autorizo a Mandy Academy a enviarme recordatorios del evento e información educativa vía SMS/WhatsApp. Puedo darme de baja respondiendo STOP.',
    `Origen: Registro Master - Landing`,
    `Variante A/B: ${registration.abVariant}`,
    `Zona horaria: ${registration.timezone}`,
    `IP: ${getClientIp(req)}`,
    `Navegador: ${userAgent}`
  ].join('\n');
}

function normalizeSlots(data, now = Date.now()) {
  return Object.entries(data || {})
    .filter(([date]) => /^\d{4}-\d{2}-\d{2}$/.test(date))
    .map(([date, value]) => ({
      date,
      slots: Array.isArray(value?.slots)
        ? value.slots.filter(slot => Number.isFinite(Date.parse(slot)) && Date.parse(slot) >= now - 60000).sort()
        : []
    }))
    .filter(day => day.slots.length)
    .sort((a, b) => a.date.localeCompare(b.date));
}

async function fetchFreeSlots(deps, startDate, endDate, timezone) {
  const { config, requestGhl } = deps;
  const query = new URLSearchParams({
    startDate: String(startDate),
    endDate: String(endDate),
    timezone
  });
  const data = await requestGhl(`/calendars/${encodeURIComponent(config.calendarId)}/free-slots?${query}`, {
    version: '2021-04-15'
  });
  return normalizeSlots(data, deps.now());
}

async function handleRegister(req, res, deps) {
  assertSameOrigin(req);
  assertIntegrationConfig(deps.config, ['ghlToken', 'locationId', 'bookingSecret']);
  const ip = getClientIp(req);
  if (!deps.allowRate(`register:${ip}`, 5, 15 * 60 * 1000, deps.now())) {
    throw new HttpError(429, 'rate_limited', 'Demasiados intentos. Espera unos minutos e inténtalo otra vez.');
  }

  const registration = validateRegistration(await readJsonBody(req));
  const registeredAt = new Date(deps.now()).toISOString();
  const upsert = await deps.requestGhl('/contacts/upsert', {
    method: 'POST',
    version: '2021-04-15',
    body: {
      locationId: deps.config.locationId,
      name: registration.name,
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      phone: registration.phone,
      country: 'US',
      timezone: registration.timezone,
      source: 'Registro Master - Landing',
      createNewIfDuplicateAllowed: false
    }
  });
  const contactId = upsert?.contact?.id;
  if (!contactId) {
    throw new HttpError(502, 'invalid_ghl_response', 'GoHighLevel no devolvió el contacto registrado.');
  }

  await deps.requestGhl(`/contacts/${encodeURIComponent(contactId)}/tags`, {
    method: 'POST',
    version: '2023-02-21',
    body: { tags: ['registro-masterclass', 'tcpa-consent-landing'] }
  });
  await deps.requestGhl(`/contacts/${encodeURIComponent(contactId)}/notes`, {
    method: 'POST',
    version: '2023-02-21',
    body: {
      userId: deps.config.amandaUserId || undefined,
      title: 'Consentimiento de registro — Masterclass',
      body: buildConsentNote(registration, req, registeredAt),
      color: '#D8B873',
      pinned: false
    }
  });

  const bookingToken = createBookingToken(contactId, deps.config.bookingSecret, deps.now());
  sendJson(res, upsert.new ? 201 : 200, {
    ok: true,
    bookingToken,
    expiresAt: new Date(deps.now() + BOOKING_TOKEN_TTL_MS).toISOString()
  });
}

function getBookingTokenFromRequest(req) {
  const value = req.headers['x-booking-token'];
  return Array.isArray(value) ? value[0] : value;
}

async function handleSlots(req, res, url, deps) {
  assertSameOrigin(req);
  assertIntegrationConfig(deps.config, ['ghlToken', 'calendarId', 'bookingSecret']);
  verifyBookingToken(getBookingTokenFromRequest(req), deps.config.bookingSecret, deps.now());
  const ip = getClientIp(req);
  if (!deps.allowRate(`slots:${ip}`, 40, 15 * 60 * 1000, deps.now())) {
    throw new HttpError(429, 'rate_limited', 'Demasiadas consultas de disponibilidad. Inténtalo más tarde.');
  }
  const timezone = sanitizeTimezone(url.searchParams.get('timezone'));
  const startDate = deps.now();
  const endDate = startDate + deps.config.slotsWindowDays * 24 * 60 * 60 * 1000;
  const days = await fetchFreeSlots(deps, startDate, endDate, timezone);
  sendJson(res, 200, { ok: true, timezone, days });
}

async function handleBook(req, res, deps) {
  assertSameOrigin(req);
  assertIntegrationConfig(deps.config, ['ghlToken', 'locationId', 'calendarId', 'bookingSecret']);
  const ip = getClientIp(req);
  if (!deps.allowRate(`book:${ip}`, 10, 15 * 60 * 1000, deps.now())) {
    throw new HttpError(429, 'rate_limited', 'Demasiados intentos de reserva. Inténtalo más tarde.');
  }

  const body = await readJsonBody(req);
  const bookingSession = verifyBookingToken(body.bookingToken, deps.config.bookingSecret, deps.now());
  const timezone = sanitizeTimezone(body.timezone);
  const startTime = String(body.startTime || '');
  const startMs = Date.parse(startTime);
  const maxStart = deps.now() + (deps.config.slotsWindowDays + 1) * 24 * 60 * 60 * 1000;
  if (!Number.isFinite(startMs) || startMs < deps.now() - 60000 || startMs > maxStart) {
    throw new HttpError(422, 'invalid_slot', 'Selecciona un horario disponible.');
  }

  const lockKey = `${bookingSession.sub}:${startMs}`;
  const existingLock = deps.bookingLocks.get(lockKey);
  if (existingLock && existingLock > deps.now()) {
    throw new HttpError(409, 'duplicate_booking', 'Esta reserva ya está siendo procesada o fue confirmada.');
  }
  deps.bookingLocks.set(lockKey, deps.now() + 10 * 60 * 1000);

  try {
    const rangeStart = Math.max(deps.now(), startMs - 12 * 60 * 60 * 1000);
    const rangeEnd = startMs + 36 * 60 * 60 * 1000;
    const availableDays = await fetchFreeSlots(deps, rangeStart, rangeEnd, timezone);
    const slotIsAvailable = availableDays.some(day => day.slots.some(slot => Date.parse(slot) === startMs));
    if (!slotIsAvailable) {
      throw new HttpError(409, 'slot_unavailable', 'Ese horario acaba de dejar de estar disponible. Elige otro.');
    }

    const endTime = new Date(startMs + deps.config.bookingDurationMinutes * 60 * 1000).toISOString();
    const appointment = await deps.requestGhl('/calendars/events/appointments', {
      method: 'POST',
      version: '2021-04-15',
      body: {
        calendarId: deps.config.calendarId,
        locationId: deps.config.locationId,
        contactId: bookingSession.sub,
        startTime,
        endTime,
        title: 'Masterclass Gratuita',
        appointmentStatus: 'confirmed',
        toNotify: true,
        ignoreDateRange: false,
        ignoreFreeSlotValidation: false
      }
    });

    sendJson(res, 201, {
      ok: true,
      appointment: {
        id: appointment.id,
        startTime: appointment.startTime || startTime,
        endTime: appointment.endTime || endTime
      }
    });
  } catch (error) {
    deps.bookingLocks.delete(lockKey);
    throw error;
  }
}

function serveStatic(req, res, requestPath) {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end();
    return;
  }
  if (requestPath === '/') requestPath = '/index.html';
  if (requestPath.startsWith('/.') || requestPath === '/server.js' || requestPath.startsWith('/tests/')) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
    return;
  }

  const filePath = path.resolve(ROOT_DIR, `.${requestPath.replace(/\//g, path.sep)}`);
  const workspaceRoot = `${path.resolve(ROOT_DIR)}${path.sep}`;
  if (!filePath.startsWith(workspaceRoot)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  if (!MIME_TYPES[extname]) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      res.writeHead(error && error.code !== 'ENOENT' ? 500 : 404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(error && error.code !== 'ENOENT' ? 'Internal Server Error' : '<h1>404 Not Found</h1>');
      return;
    }

    const fileSize = stats.size;
    const range = req.headers.range;
    const baseHeaders = {
      'Content-Type': MIME_TYPES[extname],
      'Accept-Ranges': 'bytes',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };

    if (range && extname === '.mp4') {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!match || (!match[1] && !match[2])) {
        res.writeHead(416, { ...baseHeaders, 'Content-Range': `bytes */${fileSize}` });
        res.end();
        return;
      }

      let start;
      let end;
      if (!match[1]) {
        const suffixLength = Number(match[2]);
        start = Math.max(fileSize - suffixLength, 0);
        end = fileSize - 1;
      } else {
        start = Number(match[1]);
        end = match[2] ? Number(match[2]) : fileSize - 1;
      }
      if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start || start >= fileSize) {
        res.writeHead(416, { ...baseHeaders, 'Content-Range': `bytes */${fileSize}` });
        res.end();
        return;
      }
      end = Math.min(end, fileSize - 1);
      const chunkSize = end - start + 1;
      res.writeHead(206, {
        ...baseHeaders,
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Content-Length': chunkSize
      });
      if (req.method === 'HEAD') {
        res.end();
        return;
      }
      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, { ...baseHeaders, 'Content-Length': fileSize });
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    fs.createReadStream(filePath).pipe(res);
  });
}

function createApplicationServer(options = {}) {
  const config = getConfig(options.config);
  const allowRate = createRateLimiter();
  const bookingLocks = new Map();
  const now = options.now || (() => Date.now());
  const requestGhl = options.ghlRequest || ((endpoint, requestOptions) => defaultGhlRequest(config, endpoint, requestOptions));
  const deps = { config, allowRate, bookingLocks, now, requestGhl };

  return http.createServer(async (req, res) => {
    const requestId = crypto.randomUUID();
    try {
      const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
      const requestPath = decodeURIComponent(url.pathname);

      if (requestPath === '/api/register' && req.method === 'POST') {
        await handleRegister(req, res, deps);
        return;
      }
      if (requestPath === '/api/calendar/slots' && req.method === 'GET') {
        await handleSlots(req, res, url, deps);
        return;
      }
      if (requestPath === '/api/calendar/book' && req.method === 'POST') {
        await handleBook(req, res, deps);
        return;
      }
      if (requestPath.startsWith('/api/')) {
        throw new HttpError(404, 'api_not_found', 'Ruta API no encontrada.');
      }
      serveStatic(req, res, requestPath);
    } catch (error) {
      console.error('Request failed', {
        requestId,
        status: error.status || 500,
        code: error.code || 'internal_error',
        upstreamStatus: error.upstreamStatus
      });
      if (!res.headersSent) sendApiError(res, error);
    }
  });
}

if (require.main === module) {
  const config = getConfig();
  const server = createApplicationServer({ config });
  server.listen(config.port, () => {
    const integrationReady = Boolean(config.ghlToken && config.locationId && config.calendarId && config.bookingSecret);
    console.log(`Server running at http://localhost:${config.port}/`);
    console.log(`GoHighLevel integration: ${integrationReady ? 'ready' : 'not configured'}`);
  });
}

module.exports = {
  HttpError,
  createApplicationServer,
  createBookingToken,
  verifyBookingToken,
  validateRegistration,
  normalizeSlots,
  getConfig
};
