import { config } from '@config/config';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query, params } = req;

    this.logger.log(`📥 [${method}] ${originalUrl}`);

    if (!config.app.isProduction) {
      this.logger.debug(`🔹 Body: ${JSON.stringify(body)}`);
      this.logger.debug(`🔹 Query: ${JSON.stringify(query)}`);
      this.logger.debug(`🔹 Params: ${JSON.stringify(params)}`);
    }

    next();
  }
}
