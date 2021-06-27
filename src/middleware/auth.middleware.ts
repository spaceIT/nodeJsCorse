import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyCallback, VerifyErrors } from 'jsonwebtoken';
import { HTTP_STATUS, UNAUTHORIZED } from '../utils/router.helpers';
import { JWT_SECRET_KEY } from '../common/config';
import { getById } from '../resources/users/user.service';
import { IAuthToken } from '../interfaces';
import { User } from '../resources/entries/user';

declare module 'http' {
  interface IncomingHttpHeaders {
    user: Partial<User>;
  }
}

const BEARER = 'Bearer ';
const UNAUTHORIZED_PATHS = ['/login', '/doc', '/'];

const isUnauthorizedPath = ({ url }: Request): boolean => UNAUTHORIZED_PATHS.includes(url);

const promisifyJWT = (token: string, secretOrPublicKey: string): Promise<IAuthToken> =>
  new Promise((resolve, reject) => {
    const verifyCallback: VerifyCallback<IAuthToken> = (
      err: VerifyErrors | null,
      data?: IAuthToken
    ): void => {
      if (err || !data) {
        reject(err);
      } else {
        resolve(data);
      }
    };

    jwt.verify(token, secretOrPublicKey, verifyCallback as VerifyCallback);
  });

export const authHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.method === 'OPTIONS' || isUnauthorizedPath(req)) {
    next();
    return;
  }

  const unauthorizedAccess = (message = UNAUTHORIZED): void => {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ message });
  };

  const sessionToken = req.headers.authorization;
  if (!sessionToken?.startsWith(BEARER)) {
    unauthorizedAccess('Bearer authorization scheme does not found');
    return;
  }

  try {
    const tokenPayload = sessionToken.substr(BEARER.length);
    const { userId, login } = await promisifyJWT(tokenPayload, 'secret-key');
    const user = await getById(userId);
    if (!user || user.login !== login) {
      unauthorizedAccess();
      return;
    }

    req.headers.user = user;
    next();
  } catch (error) {
    unauthorizedAccess(error.message);
  }
};
