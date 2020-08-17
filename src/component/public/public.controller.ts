import { compare, hash } from 'bcrypt';
import { Request, Response } from 'express';
import STATUS_CODES from 'http-status-codes';
import sequelize from '../../utils/dbConfig';
import { createToken, response } from '../../utils/helper';
import { DriverModel } from '../driver/models';
import { DriverType } from '../driver/types';
import { UserModel } from '../user/models';
import { UserType } from '../user/types';
import { CabModel } from '../cab/models';
import { CabType } from '../cab/types';
import { errorHandler } from '../../middlewares/errorHandler';
class PublicController {
  /**
   * @description User Login
   * @param req
   * @param res
   */
  public async userLogin(req: Request, res: Response) {
    try {
      let { email, password } = req.body;
      const isUserExist = await UserModel.getSingle({ email }, [], { raw: true });

      if (!isUserExist) {
        response(res, STATUS_CODES.NOT_FOUND, 'User not found. Register first');
        return;
      }
      const isPwdMatching = await compare(password, String(isUserExist.password));

      if (!isPwdMatching) {
        response(res, STATUS_CODES.UNAUTHORIZED, 'Username/Password is wrong', {});
        return;
      }
      const claims = { user_id: Number(isUserExist.user_id), user_name: String(isUserExist.user_name), email };
      const token = createToken(claims);
      response(res, STATUS_CODES.OK, 'Login Successful', { token });
    } catch (e) {
      console.error(`Error while login ${e}`); // Log
      response(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Server Error');
    }
  }

  /**
   * @description user Registration
   * @param req
   * @param res
   */
  public async userRegister(req: Request, res: Response) {
    try {
      let { user_name, phone, email, password } = req.body;

      const isUserExist = await UserModel.getSingle({ email }, [], { raw: true });

      if (isUserExist) {
        response(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'User already registered with this email');
        return;
      }

      password = await hash(password, 10);

      const userObj: UserType = {
        user_name,
        phone,
        email,
        password
      };

      const user = await UserModel.addOne(userObj);

      const claims = { user_id: Number(user.user_id), user_name, email };
      const token = createToken(claims);
      response(res, STATUS_CODES.OK, 'Register Successful', { token });
    } catch (e) {
      console.error(`Error while login ${e}`); // Log
      response(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Server Error');
    }
  }

  /**
   * @description Driver Login
   * @param req
   * @param res
   */
  public async driverLogin(req: Request, res: Response) {
    try {
      let { email, password } = req.body;

      const isDriverExist = await DriverModel.getSingle({ email }, [], { raw: true });

      if (!isDriverExist) {
        response(res, STATUS_CODES.NOT_FOUND, 'Driver not found. Register first');
        return;
      }

      const isPwdMatching = await compare(password, String(isDriverExist.password));

      if (!isPwdMatching) {
        response(res, STATUS_CODES.UNAUTHORIZED, 'Username/Password is wrong', {});
        return;
      }

      const claims = { user_id: Number(isDriverExist.driver_id), user_name: String(isDriverExist.driver_name), email };
      const token = createToken(claims);
      response(res, STATUS_CODES.OK, 'Login Successful', { token });
    } catch (e) {
      console.error(`Error while login ${e}`); // Log
      response(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Server Error');
    }
  }

  /**
   * @description Driver Registration
   * @param req
   * @param res
   */
  public async driverRegister(req: Request, res: Response) {
    try {
      let { driver_name, phone, email, password, cab_no, cab_lat, cab_lng } = req.body;

      const isDriverExist = await DriverModel.getSingle({ email }, [], { raw: true });

      if (isDriverExist) {
        response(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'User already registered with this email');
        return;
      }
      password = await hash(password, 10);

      const transaction = await sequelize.transaction();
      try {
        const driverObj: DriverType = { driver_name, phone, email, password };
        const driver = await DriverModel.addOne(driverObj, transaction);

        const cabObj: CabType = { driver_id: driver.driver_id, cab_no, cab_lat, cab_lng };
        await CabModel.addOne(cabObj, transaction);

        const claims = { user_id: Number(driver.driver_id), user_name: driver_name, email };
        const token = createToken(claims);

        await transaction.commit();

        response(res, STATUS_CODES.OK, 'Register Successful', { token });
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } catch (e) {
      console.error(`Error while login ${e}`); // Log
      response(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Server Error');
    }
  }
}

export default new PublicController();
