import { NextFunction, Request, Response } from 'express';
import { validationResponse } from '../../utils/helper';
import { isBoolean, isEmail, isEmpty, isJSON, isNumber, isString } from '../../utils/validator';

class UserValidations {

  /**
   * @description User Booking History List
   * @param req
   * @param res
   * @param next
   */
  public history(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const { search, rowNumber, recordsPerPage, sortOrder, sortBy, showAll } = req.body;
    const errors: any = {};
    if (isEmpty(authorization)) {
      errors.authorization = 'Authorization Token is required';
    }

    if (!isEmpty(search) && !isJSON(search)) {
      errors.search = 'Search Json is not valid';
    }
    if (!isEmpty(rowNumber) && !isNumber(rowNumber)) {
      errors.rowNumber = 'Row Number should be numeric';
    } else if (!isEmpty(rowNumber) && Number(rowNumber) <= 0) {
      errors.rowNumber = 'Row Number should be greater than 0.';
    }
    if (!isEmpty(recordsPerPage) && !isNumber(recordsPerPage)) {
      errors.recordsPerPage = 'Record Per Page should be numeric';
    }
    if (!isEmpty(sortOrder) && !isString(sortOrder)) {
      errors.sortOrder = 'Sort Order should be valid string';
    }
    if (!isEmpty(sortBy) && !isString(sortBy)) {
      errors.sortBy = 'Sort By should be valid string';
    }
    if (!isEmpty(showAll) && !isBoolean(showAll)) {
      errors.showAll = 'Show All should be true or false';
    }

    if (Object.keys(errors).length > 0) {
      validationResponse(res, errors);
    } else {
      next();
    }
  }

  /**
   * @description Register user
   * @param req
   * @param res
   * @param next
   */
  register(req: Request, res: Response, next: NextFunction) {
    const { user_name, phone, email, password } = req.body;
    const errors: any = {};

    if (isEmpty(user_name)) {
      errors.name = 'Name Required.';
    }

    if (isEmpty(phone)) {
      errors.name = 'Name Required.';
    }

    if (isEmpty(email)) {
      errors.email = 'Email is required';
    } else if (!isEmail(email)) {
      errors.email = 'Should be valid email';
    }

    if (isEmpty(password)) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      validationResponse(res, errors);
    } else {
      next();
    }
  }
}

export default new UserValidations();
