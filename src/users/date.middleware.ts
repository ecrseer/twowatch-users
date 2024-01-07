import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DateMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    try {
      req.body.lastActivity = new Date();
    } catch {}
    next();
  }
}
