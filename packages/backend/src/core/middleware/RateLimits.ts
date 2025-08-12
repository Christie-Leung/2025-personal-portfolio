import { Middleware, MiddlewareMethods, Next } from '@tsed/common';
import type { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

// Per-IP
const ipLimiter = rateLimit({ windowMs: 60_000, max: 5, standardHeaders: true, legacyHeaders: false });
// Per-session (falls back to IP)
const sessionLimiter = rateLimit({
  windowMs: 60_000,
  keyGenerator: (req) => (req.signedCookies?.sid ? `sid:${req.signedCookies.sid}:${req.ip}` : `ip:${req.ip}`),
  max: 8
});

@Middleware()
export class LimitPerIp implements MiddlewareMethods {
  use(req: Request, res: Response, next: Next) { ipLimiter(req, res, next); }
}

@Middleware()
export class LimitPerSession implements MiddlewareMethods {
  use(req: Request, res: Response, next: Next) { sessionLimiter(req, res, next); }
}
