import { Transaction } from 'sequelize';
import { Driver } from '../schemas';
import { DriverType } from '../types';

class DriverModel {
  /**
   * @description Add new Driver
   * @param driverObj
   * @param transaction
   */
  async addOne(driverObj: DriverType, transaction: Transaction | undefined = undefined): Promise<DriverType> {
    try {
      const insertedObj = await Driver.create(driverObj, { transaction: transaction ? transaction : undefined });
      return insertedObj;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get total count
   * @param condition
   */
  async getTotal(condition: any = {}): Promise<number> {
    try {
      const count: number = await Driver.count({
        where: condition
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get Drivers list
   * @param condition
   * @param attributes
   * @param others
   */
  async getMany(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<DriverType[]> {
    try {
      return await Driver.findAll({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Get single Driver
   * @param condition
   * @param attributes
   * @param others
   */
  async getSingle(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<DriverType | null> {
    try {
      return await Driver.findOne({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Update Driver Details
   * @param {Object} obj update object
   * @param {Object} condition
   * @param {Object} transaction
   */
  async update(obj: object, condition: any, transaction: Transaction | undefined = undefined) {
    try {
      await Driver.update(obj, {
        where: condition,
        transaction: transaction ? transaction : undefined
      });
      return;
    } catch (e) {
      throw e;
    }
  }
}

export default new DriverModel();
