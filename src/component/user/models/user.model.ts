import { Transaction } from 'sequelize';
import { UserType } from '../types';
import { User } from '../schemas';

class UserModel {
  /**
   * @description Add new User
   * @param userObj
   * @param transaction
   */
  async addOne(userObj: UserType, transaction: Transaction | undefined = undefined): Promise<UserType> {
    try {
      const insertedObj = await User.create(userObj, { transaction: transaction ? transaction : undefined });
      return insertedObj;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get users list
   * @param condition
   * @param attributes
   * @param others
   */
  async getMany(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<UserType[]> {
    try {
      return await User.findAll({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Get single user
   * @param condition
   * @param attributes
   * @param others
   */
  async getSingle(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<UserType | null> {
    try {
      return await User.findOne({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Update User Details
   * @param {Object} obj update object
   * @param {Object} condition
   * @param {Object} transaction
   */
  async update(obj: object, condition: any, transaction: Transaction | undefined = undefined) {
    try {
      await User.update(obj, {
        where: condition,
        transaction: transaction ? transaction : undefined
      });
      return;
    } catch (e) {
      throw e;
    }
  }
}

export default new UserModel();
