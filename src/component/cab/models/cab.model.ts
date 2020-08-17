import { Transaction } from 'sequelize';
import { Cab } from '../schemas';
import { CabType } from '../types';
import sequelize from '../../../utils/dbConfig';

class CabModel {
  /**
   * @description Add new Cab
   * @param cabObj
   * @param transaction
   */
  async addOne(cabObj: CabType, transaction: Transaction | undefined = undefined): Promise<any> {
    try {
      const insertedObj = await Cab.create(cabObj, { transaction: transaction ? transaction : undefined });
      return insertedObj;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get Cabs list
   * @param condition
   * @param attributes
   * @param others
   */
  async getMany(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<any> {
    try {
      return await Cab.findAll({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Get single Cab
   * @param condition
   * @param attributes
   * @param others
   */
  async getSingle(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<any> {
    try {
      return await Cab.findOne({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Update Cab Details
   * @param {Object} obj update object
   * @param {Object} condition
   * @param {Object} transaction
   */
  async update(obj: object, condition: any, transaction: Transaction | undefined = undefined) {
    try {
      await Cab.update(obj, {
        where: condition,
        transaction: transaction ? transaction : undefined
      });
      return;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Get data from raw query
   * @param query
   */
  async getDataUsingRawQuery(query: string): Promise<any> {
    try {
      return await sequelize.query(query);
    } catch (e) {
      throw e;
    }
  }
}

export default new CabModel();
