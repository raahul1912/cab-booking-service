import { Request, Response } from 'express';
import STATUS_CODES from 'http-status-codes';
import { CustomRequest } from '../..';
import { response } from '../../utils/helper';
import { RideModel } from '../ride/models';
import { RideType } from '../ride/types';
import { CabModel } from './models';

class CabController {
  /**
   * @description Fetch nearby cabs
   * @param req
   * @param res
   */
  public async nearby(req: Request, res: Response) {
    try {
      const { cab_lat, cab_lng } = req.body;
      const query: string = `SELECT cab_id, cab_no, 
      (
        (ACOS(SIN(${cab_lat} * PI() / 180) * 
        SIN(${cab_lat} * PI() / 180) + COS(${cab_lat} * PI() / 180) * 
        COS(${cab_lat} * PI() / 180) * COS((${cab_lng} - ${cab_lng}) * 
        PI() / 180)) * 180 / PI()
        ) * 60 * 1.1515
      ) as distance 
      FROM cabs 
      HAVING distance <= distance 
      ORDER BY distance ASC;`;

      let nearbyCabs = await CabModel.getDataUsingRawQuery(query);
      if (nearbyCabs.length) {
        nearbyCabs = nearbyCabs[0];
      }
      response(res, STATUS_CODES.OK, 'Nearest cabs', nearbyCabs);
    } catch (e) {
      console.error(`Error while booking a cab ${e}`); // Log
      response(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Server Error');
    }
  }

  /**
   * @description Book a cab
   * @param req
   * @param res
   */
  public async book(req: CustomRequest, res: Response) {
    try {
      const { cab_id, src_lat, src_lng, dest_lat, dest_lng, fare } = req.body;
      const user_id = req.tokenData?.user_id;

      const cab = await CabModel.getSingle({ cab_id }, [], { raw: true });
      if (!cab) {
        response(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Cab not found', {});
        return;
      }

      const rideObj: RideType = { driver_id: cab.driver_id, user_id, src_lat, src_lng, dest_lat, dest_lng, fare };

      await RideModel.addOne(rideObj);

      response(res, STATUS_CODES.OK, 'Cab Booked', {});
    } catch (e) {
      console.error(`Error while booking a cab ${e}`); // Log
      response(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Server Error');
    }
  }
}

export default new CabController();
