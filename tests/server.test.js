const test = require('node:test');
const assert = require('node:assert/strict');
const {
  createApplicationServer,
  createBookingToken,
  verifyBookingToken,
  validateRegistration
} = require('../server');

const SECRET = 'test-secret-that-is-longer-than-thirty-two-characters';
const FIXED_NOW = Date.parse('2026-07-01T12:00:00.000Z');

async function startTestServer(options = {}) {
  const server = createApplicationServer({
    config: {
      ghlToken: 'test-token',
      locationId: 'test-location',
      formId: 'test-form',
      calendarId: 'test-calendar',
      amandaUserId: 'test-user',
      bookingSecret: SECRET,
      bookingDurationMinutes: 90,
      slotsWindowDays: 14,
      ...options.config
    },
    now: options.now || (() => FIXED_NOW),
    ghlRequest: options.ghlRequest
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  return {
    server,
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise(resolve => server.close(resolve))
  };
}

test('validates and normalizes registration data', () => {
  const result = validateRegistration({
    name: '  Amanda   Olmo ',
    email: 'AMANDA@example.com',
    phone: '(702) 555-0123',
    tcpaConsent: true,
    timezone: 'America/Los_Angeles',
    abVariant: 'A'
  });
  assert.equal(result.name, 'Amanda Olmo');
  assert.equal(result.firstName, 'Amanda');
  assert.equal(result.lastName, 'Olmo');
  assert.equal(result.email, 'amanda@example.com');
  assert.equal(result.phone, '+17025550123');
});

test('rejects registration without TCPA consent', () => {
  assert.throws(() => validateRegistration({
    name: 'Amanda Olmo',
    email: 'amanda@example.com',
    phone: '7025550123',
    tcpaConsent: false
  }), error => error.code === 'consent_required');
});

test('signs, verifies and expires booking tokens', () => {
  const token = createBookingToken('contact-123', SECRET, FIXED_NOW);
  assert.equal(verifyBookingToken(token, SECRET, FIXED_NOW + 1000).sub, 'contact-123');
  assert.throws(() => verifyBookingToken(`${token}x`, SECRET, FIXED_NOW), error => error.code === 'invalid_booking_session');
  assert.throws(() => verifyBookingToken(token, SECRET, FIXED_NOW + 25 * 60 * 60 * 1000), error => error.code === 'expired_booking_session');
});

test('registers a contact, adds tags and records consent without exposing contact id', async t => {
  const calls = [];
  const app = await startTestServer({
    ghlRequest: async (endpoint, options) => {
      calls.push({ endpoint, options });
      if (endpoint === '/contacts/upsert') return { new: true, contact: { id: 'contact-123' } };
      if (endpoint === '/contacts/contact-123/tags') return { tags: ['registro-masterclass', 'tcpa-consent-landing'] };
      if (endpoint === '/contacts/contact-123/notes') return { note: { id: 'note-123' } };
      throw new Error(`Unexpected endpoint: ${endpoint}`);
    }
  });
  t.after(app.close);

  const response = await fetch(`${app.baseUrl}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Amanda Olmo',
      email: 'amanda@example.com',
      phone: '+17025550123',
      tcpaConsent: true,
      timezone: 'America/Los_Angeles',
      abVariant: 'A'
    })
  });
  const result = await response.json();

  assert.equal(response.status, 201);
  assert.equal(result.ok, true);
  assert.equal(typeof result.bookingToken, 'string');
  assert.equal('contactId' in result, false);
  assert.deepEqual(calls.map(call => call.endpoint), [
    '/contacts/upsert',
    '/contacts/contact-123/tags',
    '/contacts/contact-123/notes'
  ]);
  assert.match(calls[2].options.body.body, /Consentimiento TCPA: Sí/);
});

test('returns sanitized free slots for an authenticated booking session', async t => {
  const slot = '2026-07-02T10:00:00-07:00';
  const app = await startTestServer({
    ghlRequest: async endpoint => {
      assert.match(endpoint, /^\/calendars\/test-calendar\/free-slots\?/);
      return { '2026-07-02': { slots: [slot] } };
    }
  });
  t.after(app.close);
  const token = createBookingToken('contact-123', SECRET, FIXED_NOW);

  const response = await fetch(`${app.baseUrl}/api/calendar/slots?timezone=America%2FLos_Angeles`, {
    headers: { 'X-Booking-Token': token }
  });
  const result = await response.json();

  assert.equal(response.status, 200);
  assert.equal(result.days.length, 1);
  assert.equal(result.days[0].slots[0], slot);
});

test('rechecks availability and creates a confirmed appointment', async t => {
  const slot = '2026-07-02T10:00:00-07:00';
  const calls = [];
  const app = await startTestServer({
    ghlRequest: async (endpoint, options) => {
      calls.push({ endpoint, options });
      if (endpoint.startsWith('/calendars/test-calendar/free-slots?')) {
        return { '2026-07-02': { slots: [slot] } };
      }
      if (endpoint === '/calendars/events/appointments') {
        return { id: 'appointment-123', startTime: slot, endTime: '2026-07-02T18:30:00.000Z' };
      }
      throw new Error(`Unexpected endpoint: ${endpoint}`);
    }
  });
  t.after(app.close);
  const token = createBookingToken('contact-123', SECRET, FIXED_NOW);

  const response = await fetch(`${app.baseUrl}/api/calendar/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bookingToken: token,
      startTime: slot,
      timezone: 'America/Los_Angeles'
    })
  });
  const result = await response.json();

  assert.equal(response.status, 201);
  assert.equal(result.appointment.id, 'appointment-123');
  const createCall = calls.find(call => call.endpoint === '/calendars/events/appointments');
  assert.equal(createCall.options.body.contactId, 'contact-123');
  assert.equal(createCall.options.body.appointmentStatus, 'confirmed');
  assert.equal(createCall.options.body.ignoreFreeSlotValidation, false);
});

test('does not serve local secret files', async t => {
  const app = await startTestServer({ ghlRequest: async () => ({}) });
  t.after(app.close);
  const response = await fetch(`${app.baseUrl}/.env`);
  assert.equal(response.status, 404);
});
