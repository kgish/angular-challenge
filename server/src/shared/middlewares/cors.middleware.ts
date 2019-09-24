import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  resolve(): MiddlewareFunction {
    return (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      next();
    };
  }
}
