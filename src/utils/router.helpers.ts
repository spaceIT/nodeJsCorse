import { Request, Response, NextFunction } from 'express';

export const getStatus = (entity: boolean, successCode: number, failCode: number): number =>
  entity ? successCode : failCode;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

type MiddlewareFn<T> = (req: Request<T>, res: Response, next: NextFunction) => Promise<void>;

export const promiseHandler = <T>(fn: MiddlewareFn<T>): MiddlewareFn<T> => (
  req: Request<T>,
  res: Response,
  next: NextFunction
): Promise<void> => Promise.resolve(fn(req, res, next)).catch(next);

export const UNAUTHORIZED = 'Unauthorized access';
export const FORBIDDEN = 'Access denied';
