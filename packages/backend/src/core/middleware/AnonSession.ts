import { Middleware, MiddlewareMethods, Next } from '@tsed/common';
import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';

@Middleware()
export class AnonSession implements MiddlewareMethods {
  use(req: Request, res: Response, next: Next) {
    if (!req.signedCookies?.sid) {
      res.cookie('sid', randomUUID(), {
        httpOnly: true, sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        signed: true, maxAge: 6 * 60 * 60 * 1000 // 6h
      });
    }
    next();
  }
}
