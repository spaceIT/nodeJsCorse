import { createLogger, format, transports } from 'winston';
import {Request, Response, NextFunction} from 'express'

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.timestamp(), format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'log/error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: 'log/info.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

export const logRequest = (req: Request, _res: Response, next: NextFunction): void => {
    const { originalUrl, query, body, method } = req;
    logger.info(
      `URL: ${method} ${originalUrl}, PARAMS: ${JSON.stringify(
        query
      )}, BODY: ${JSON.stringify(body)}`
    );
    next();
  };