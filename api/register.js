// Función serverless de Vercel para POST /api/register.
// Reutiliza la lógica de server.js (que en Vercel no corre como servidor).
const {
  HttpError,
  getConfig,
  handleRegister,
  sendApiError,
  defaultGhlRequest,
  createRateLimiter
} = require('../server.js');

const config = getConfig();
// A nivel de módulo para persistir mientras la instancia siga caliente
// (en serverless el rate limiting en memoria es best-effort, por instancia).
const deps = {
  config,
  allowRate: createRateLimiter(),
  bookingLocks: new Map(),
  now: () => Date.now(),
  requestGhl: (endpoint, options) => defaultGhlRequest(config, endpoint, options)
};

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      throw new HttpError(405, 'method_not_allowed', 'Método no permitido.');
    }
    await handleRegister(req, res, deps);
  } catch (error) {
    console.error('Register request failed', {
      status: error.status || 500,
      code: error.code || 'internal_error',
      upstreamStatus: error.upstreamStatus
    });
    if (!res.headersSent) sendApiError(res, error);
  }
};
