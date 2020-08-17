import { Transaction } from 'sequelize';
import sequelize from '../../../utils/dbConfig';
import { Ride } from '../schemas';
import { RideType } from '../types';

class RideModel {
  /**
   * @description Add new Ride
   * @param rideObj
   * @param transaction
   */
  async addOne(rideObj: RideType, transaction: Transaction | undefined = undefined): Promise<RideType> {
    try {
      const insertedObj = await Ride.create(rideObj, { transaction: transaction ? transaction : undefined });
      return insertedObj;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get Rides list
   * @param condition
   * @param attributes
   * @param others
   */
  async getMany(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<RideType[]> {
    try {
      return await Ride.findAll({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Get total count
   * @param condition
   */
  async getTotal(condition: any = {}): Promise<number> {
    try {
      const count: number = await Ride.count({
        where: condition
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get single Ride
   * @param condition
   * @param attributes
   * @param others
   */
  async getSingle(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<RideType | null> {
    try {
      return await Ride.findOne({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Update Ride Details
   * @param {Object} obj update object
   * @param {Object} condition
   * @param {Object} transaction
   */
  async update(obj: object, condition: any, transaction: Transaction | undefined = undefined) {
    try {
      await Ride.update(obj, {
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

export default new RideModel();
