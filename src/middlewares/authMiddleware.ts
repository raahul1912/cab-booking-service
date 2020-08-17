import { NextFunction, Response } from 'express';
import STATUS_CODES from 'http-status-codes';
import { verify } from 'jsonwebtoken';
import { CustomRequest, DataStoredInToken } from '..';
import { TOKEN_SECRET_KEY } from '../utils/constants';
import { response } from '../utils/helper';

export const isUserAuthenticated = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization }: any = req.headers;
    if (!authorization) {
      response(res, STATUS_CODES.FORBIDDEN, 'Authorization Token is required.');
      return;
    }

    if (authorization) {
      verify(authorization, TOKEN_SECRET_KEY, (err: any, decoded: object | undefined) => {
        if (err) {
          response(res, STATUS_CODES.UNAUTHORIZED, `Unauthorized access`, {});
          return;
        }
        req.tokenData = decoded as DataStoredInToken;
        next();
      });
    } else {
      response(res, STATUS_CODES.FORBIDDEN, `Unauthorized access`, {});
    }
  } catch (e) {
    console.error('Error while authorizing', e); // Log
    response(res, STATUS_CODES.INTERNAL_SERVER_ERROR, `Server Error`);
  }
};
