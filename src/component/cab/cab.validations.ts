import { NextFunction, Request, Response } from 'express';
import { validationResponse } from '../../utils/helper';
import { isEmpty, isNumber } from '../../utils/validator';

class CabValidations {
  /**
   * @description Fetch nearby cabs
   * @param req
   * @param res
   * @param next
   */
  public nearby(req: Request, res: Response, next: NextFunction) {
    const { cab_lat, cab_lng } = req.body;
    const { authorization } = req.headers;
    const errors: any = {};

    if (isEmpty(authorization)) {
      errors.authorization = 'Authorization Token is required';
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

  /**
   * @description Book cabs
   * @param req
   * @param res
   * @param next
   */
  public book(req: Request, res: Response, next: NextFunction) {
    const { cab_id, src_lat, src_lng, dest_lat, dest_lng, fare } = req.body;
    const { authorization } = req.headers;
    const errors: any = {};

    if (isEmpty(authorization)) {
      errors.authorization = 'Authorization Token is required';
    }

    if (isEmpty(cab_id)) {
      errors.cab_id = 'Cab id is required';
    } else if (!isNumber(cab_id)) {
      errors.cab_id = 'Authorization Token is required';
    }
    if (isEmpty(src_lat)) {
      errors.src_lat = 'Source is required';
    }
    if (isEmpty(src_lng)) {
      errors.src_lng = 'Source is required';
    }
    if (isEmpty(dest_lat)) {
      errors.dest_lat = 'Destination is required';
    }
    if (isEmpty(dest_lng)) {
      errors.dest_lng = 'Destination is required';
    }

    if (isEmpty(fare)) {
      errors.fare = 'Fare is required';
    }

    if (Object.keys(errors).length > 0) {
      validationResponse(res, errors);
    } else {
      next();
    }
  }
}

export default new CabValidations();
