import { NextFunction, Request, Response } from 'express';
import { validationResponse } from '../../utils/helper';
import { isEmail, isEmpty, isLength } from '../../utils/validator';

class PublicValidations {
  /**
   * @description Login User
   * @param req
   * @param res
   * @param next
   */
  login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const errors: any = {};

    if (isEmpty(email)) {
      errors.email = 'Email is required';
    } else if (!isEmail(email)) {
      errors.email = 'Email should be valid';
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

  /**
   * @description Register user
   * @param req
   * @param res
   * @param next
   */
  userRegister(req: Request, res: Response, next: NextFunction) {
    const { user_name, phone, email, password } = req.body;
    const errors: any = {};

    if (isEmpty(user_name)) {
      errors.name = 'Name Required.';
    }

    if (isEmpty(phone)) {
      errors.phone = 'Phone Required.';
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

  /**
   * @description Register user
   * @param req
   * @param res
   * @param next
   */
  driverRegister(req: Request, res: Response, next: NextFunction) {
    const { driver_name, phone, email, password, cab_no, cab_lat, cab_lng } = req.body;
    const errors: any = {};

    if (isEmpty(driver_name)) {
      errors.name = 'Name Required.';
    }

    if (isEmpty(phone)) {
      errors.phone = 'Phone Required.';
    }

    if (isEmpty(email)) {
      errors.email = 'Email is required';
    } else if (!isEmail(email)) {
      errors.email = 'Should be valid email';
    }

    if (isEmpty(password)) {
      errors.password = 'Password is required';
    }
    if (isEmpty(cab_no)) {
      errors.cab_no = 'Cab Number is required';
    }
    if (isEmpty(cab_lat)) {
      errors.cab_lat = 'Cab Location is required';
    }
    if (isEmpty(cab_lng)) {
      errors.cab_lng = 'Cab Location is required';
    }

    if (Object.keys(errors).length > 0) {
      validationResponse(res, errors);
    } else {
      next();
    }
  }
}

export default new PublicValidations();
