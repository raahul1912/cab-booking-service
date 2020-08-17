import { config } from 'dotenv';
import { resolve } from 'path';
/**
 * Load Env
 */
config({ path: resolve(__dirname, '../.env') });
import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import STATUS_CODES from 'http-status-codes';
import { describe } from 'mocha';
import { testHelper } from '../src/utils/helper';
import { UserModel } from '../src/component/user/models';
import { DriverModel } from '../src/component/driver/models';
import sequelize from '../src/utils/dbConfig';
import { CabModel } from '../src/component/cab/models';

use(chaiHttp);

describe('public', () => {
  describe('User', () => {
    let userStub: any;
    let userAddStub: any;
    before(() => {
      userStub = testHelper.createStub(UserModel, 'getSingle');
      userAddStub = testHelper.createStub(UserModel, 'addOne');
    });
    describe('User Login', () => {
      it('should return unprocessable entity with incomplete req data', async () => {
        try {
          let res = await testHelper.chaiPostRequest('/public/api/v1/user/login', {
            password: 'Rahul@123'
          });
          expect(res).to.have.status(STATUS_CODES.UNPROCESSABLE_ENTITY);
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });

      it('should return not found because of invalid user', async () => {
        try {
          userStub.callsFake(() => Promise.resolve(0));
          let res = await testHelper.chaiPostRequest('/public/api/v1/user/login', {
            email: 'rahul1@gmail.com',
            password: 'Rahul@123'
          });
          expect(res).to.have.status(STATUS_CODES.NOT_FOUND);
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });

      it('should return unauthorized because of invalid credentials', async () => {
        try {
          userStub.callsFake(() =>
            Promise.resolve({
              user_id: 1,
              user_name: 'Rahul',
              phone: '8460577830',
              email: 'rahul@gmail.com',
              password: '$2b$10$jzsPTx9tWbxNb1TRflVauOyyl73XQld27CBH9KYj5OieMB610FJVe'
            })
          );
          let res = await testHelper.chaiPostRequest('/public/api/v1/user/login', {
            email: 'rahul@gmail.com',
            password: 'Rahul@1234'
          });
          expect(res).to.have.status(STATUS_CODES.UNAUTHORIZED);
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });

      it('should return logged in', async () => {
        try {
          userStub.callsFake(() =>
            Promise.resolve({
              user_id: 1,
              user_name: 'Rahul',
              phone: '8460577830',
              email: 'rahul@gmail.com',
              password: '$2b$10$jzsPTx9tWbxNb1TRflVauOyyl73XQld27CBH9KYj5OieMB610FJVe'
            })
          );
          let res = await testHelper.chaiPostRequest('/public/api/v1/user/login', {
            email: 'rahul@gmail.com',
            password: 'Rahul@123'
          });
          expect(res).to.have.status(STATUS_CODES.OK);
          expect(res.body.payload).to.be.a('object');
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });
    });

    describe('User Register', () => {
      it('should return unprocessable entity with incomplete req data', async () => {
        try {
          let res = await testHelper.chaiPostRequest('/public/api/v1/user/register', {
            phone: '8460577830',
            email: 'rahul@gmail.com',
            password: 'Rahul@123'
          });
          expect(res).to.have.status(STATUS_CODES.UNPROCESSABLE_ENTITY);
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });

      it('should return user already registered', async () => {
        try {
          userStub.callsFake(() =>
            Promise.resolve({
              user_id: 1,
              user_name: 'Rahul',
              phone: '8460577830',
              email: 'rahul@gmail.com',
              password: '$2b$10$jzsPTx9tWbxNb1TRflVauOyyl73XQld27CBH9KYj5OieMB610FJVe'
            })
          );
          let res = await testHelper.chaiPostRequest('/public/api/v1/user/register', {
            user_name: 'Rahul',
            phone: '8460577830',
            email: 'rahul@gmail.com',
            password: 'Rahul@123'
          });
          expect(res).to.have.status(STATUS_CODES.UNPROCESSABLE_ENTITY);
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });

      it('should return User Registered', async () => {
        try {
          userStub.callsFake(() => Promise.resolve(0));
          userAddStub.callsFake(() => Promise.resolve(1));
          let res = await testHelper.chaiPostRequest('/public/api/v1/user/register', {
            user_name: 'Rahul',
            phone: '8460577830',
            email: 'rahul@gmail.com',
            password: 'Rahul@123'
          });
          expect(res).to.have.status(STATUS_CODES.OK);
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });
    });
  });

  describe('Driver', () => {
    let driverStub: any;
    let driverAddStub: any;
    let transactionStub: any;
    let cabAddStub: any;

    before(() => {
      driverStub = testHelper.createStub(DriverModel, 'getSingle');
      driverAddStub = testHelper.createStub(DriverModel, 'addOne');
      transactionStub = testHelper.createStub(sequelize, 'transaction');
      cabAddStub = testHelper.createStub(CabModel, 'addOne');
      transactionStub.callsFake(() =>
        Promise.resolve({
          rollback: function () {
            return console.log('Transaction Rollback!');
          },
          commit: function () {
            return console.log('Transaction Committed!');
          }
        })
      );
    });

    describe('Driver Login', () => {
      it('should return unprocessable entity with incomplete req data', async () => {
        try {
          let res = await testHelper.chaiPostRequest('/public/api/v1/driver/login', {
            password: 'Driver1@123'
          });
          expect(res).to.have.status(STATUS_CODES.UNPROCESSABLE_ENTITY);
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });

      it('should return not found because of invalid user', async () => {
        try {
          driverStub.callsFake(() => Promise.resolve(0));
          let res = await testHelper.chaiPostRequest('/public/api/v1/driver/login', {
            email: 'driver1as@gmail.com',
            password: 'Driver1@123'
          });
          expect(res).to.have.status(STATUS_CODES.NOT_FOUND);
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });

      it('should return unauthorized because of invalid credentials', async () => {
        try {
          driverStub.callsFake(() => Promise.resolve(1));
          let res = await testHelper.chaiPostRequest('/public/api/v1/driver/login', {
            email: 'driver1@gmail.com',
            password: 'Driver1@1234'
          });
          expect(res).to.have.status(STATUS_CODES.UNAUTHORIZED);
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });

      it('should return logged in', async () => {
        try {
          driverStub.callsFake(() =>
            Promise.resolve({
              driver_id: 3,
              driver_name: 'Driver1',
              phone: '8765432109',
              email: 'driver1@gmail.com',
              password: '$2b$10$8X5vJpvsxuHyGouIWbbmqeoRUHRnGN.h.ALq0Kc4Aeh94IhTufEiW'
            })
          );
          let res = await testHelper.chaiPostRequest('/public/api/v1/driver/login', {
            email: 'driver1@gmail.com',
            password: 'Driver1@123'
          });
          expect(res).to.have.status(STATUS_CODES.OK);
          expect(res.body.payload).to.be.a('object');
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });
    });

    describe('Driver Register', () => {
      it('should return unprocessable entity with incomplete req data', async () => {
        try {
          let res = await testHelper.chaiPostRequest('/public/api/v1/driver/register', {
            phone: '6543219870',
            email: 'driver3@gmail.com',
            password: 'Driver@123',
            cab_no: 'MH654897',
            cab_lat: '23.102071',
            cab_lng: '72.589632'
          });
          expect(res).to.have.status(STATUS_CODES.UNPROCESSABLE_ENTITY);
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });

      it('should return user already registered', async () => {
        try {
          driverStub.callsFake(() =>
            Promise.resolve({
              driver_id: 4,
              driver_name: 'Driver2',
              phone: '6549873210',
              email: 'driver2@gmail.com',
              password: '$2b$10$fdSO5bc.TjfXZ0AyNaoyguzfzUJ9JOwr7989xOCRcvzPXuWYUR/pC'
            })
          );
          let res = await testHelper.chaiPostRequest('/public/api/v1/user/register', {
            driver_name: 'Driver3',
            phone: '6543219870',
            email: 'driver2@gmail.com',
            password: 'Driver@123',
            cab_no: 'MH654897',
            cab_lat: '23.102071',
            cab_lng: '72.589632'
          });
          expect(res).to.have.status(STATUS_CODES.UNPROCESSABLE_ENTITY);
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      });

      /*   it('should return Driver Registered', async () => {
        try {
          driverStub.callsFake(() => Promise.resolve(0));
          transactionStub.callsFake(() => Promise.resolve(1));
          driverAddStub.callsFake(() =>
            Promise.resolve({
              driver_id: 4,
              driver_name: 'Driver3',
              phone: '6543219870',
              email: 'driver3@gmail.com',
              password: '$2b$10$fdSO5bc.TjfXZ0AyNaoyguzfzUJ9JOwr7989xOCRcvzPXuWYUR/pC'
            })
          );
          cabAddStub.callsFake(() => Promise.resolve(1));

          let res = await testHelper.chaiPostRequest('/public/api/v1/user/register', {
            driver_name: 'Driver3',
            phone: '6543219870',
            email: 'driver3@gmail.com',
            password: 'Driver@123',
            cab_no: 'MH654897',
            cab_lat: '23.102071',
            cab_lng: '72.589632'
          });
          expect(res).to.have.status(STATUS_CODES.OK);
        } catch (error) {
          expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
      }); */
    });
  });
});
