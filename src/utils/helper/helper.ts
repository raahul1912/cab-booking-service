import { Response } from 'express';
import STATUS_CODES from 'http-status-codes';
import { decode, sign } from 'jsonwebtoken';
import { DataStoredInToken } from '../../index';
import { TOKEN_SECRET_KEY } from '../constants';
const BCRYPT_SALT: any = process.env.BCRYPT_SALT;
/**
 * @description Create Response
 * @param {Object} res
 * @param {Number} status
 * @param {String} message
 * @param {Object} payload
 * @param {Object} pager
 */
export const response = (
  res: Response,
  status: number,
  message: string,
  payload: object | null = {},
  pager: object | null = {}
) => {
  const resPager = typeof pager !== 'undefined' ? pager : {};

  return res.status(status).json({
    status,
    message,
    payload,
    pager: resPager
  });
};

/**
 * @description Send Validation Response
 * @param {Object} res
 * @param {errors} errors - Errors Object
 */
export const validationResponse = (res: Response, errors: any) => {
  return response(
    res,
    STATUS_CODES.UNPROCESSABLE_ENTITY,
    errors[Object.keys(errors)[0]],
    { error: errors[Object.keys(errors)[0]] },
    {}
  );
};

/**
 * @description Will create auth token
 * @param data
 */
export const createToken = (data: DataStoredInToken) => {
  try {
    const expiresIn = 60 * 60; // an hour
    const token = sign(data, TOKEN_SECRET_KEY, { expiresIn });
    return token;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Will decode the token value
 * @param token
 */
export const decodeToken = (token: string) => {
  const data = decode(token, { complete: true });
  return data;
};

/**
 * @description Get Default sort Order
 * @param sortOrder
 */
export const getDefaultSortOrder = (sortOrder: string): string => {
  const order: string =
    sortOrder && ['asc', 'desc'].indexOf(sortOrder.toLowerCase()) !== -1
      ? sortOrder.toLowerCase() === 'asc'
        ? 'ASC'
        : 'DESC'
      : 'DESC';
  return order;
};
