import { Injectable, type NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";
import pinoHttp from "pino-http";
import { loggerOptions } from "src/logger/logger";

const httpLogger = pinoHttp(loggerOptions);

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    httpLogger(req, res);
    next();
  }
}
