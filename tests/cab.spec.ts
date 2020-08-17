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
import { CabModel } from '../src/component/cab/models';
import { testHelper } from '../src/utils/helper';
import { RideModel } from '../src/component/ride/models';
use(chaiHttp);

describe('cabs', () => {
  describe('fetching cabs', () => {
    const stubValue = [
      {
        cab_id: 1,
        cab_no: 'MH12UF6541',
        distance: 0
      },
      {
        cab_id: 2,
        cab_no: 'MH12UF9999',
        distance: 0
      }
    ];

    it('should return access denied while fetching nearby cabs', async () => {
      try {
        let res = await testHelper.chaiPostRequest('/cab/api/v1/nearby', {
          cab_lat: '23.102071',
          cab_lng: '72.589632'
        });
        expect(res).to.have.status(STATUS_CODES.FORBIDDEN);
      } catch (error) {
        expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
    });

    it('should return unprocessable entity', async () => {
      try {
        let res = await testHelper.chaiPostRequest(
          '/cab/api/v1/nearby',
          { cab_lat: '23.102071' },
          'Authorization',
          process.env.AUTH_TOKEN
        );
        expect(res).to.have.status(STATUS_CODES.UNPROCESSABLE_ENTITY);
      } catch (error) {
        expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
    });

    it('should get all the nearby cabs', async () => {
      try {
        let stub = testHelper.createStub(CabModel, 'getDataUsingRawQuery');
        stub.callsFake(() => Promise.resolve(stubValue));
        let res = await testHelper.chaiPostRequest(
          '/cab/api/v1/nearby',
          { cab_lat: '23.102071', cab_lng: '72.589632' },
          'Authorization',
          process.env.AUTH_TOKEN
        );
        expect(res).to.have.status(STATUS_CODES.OK);
      } catch (error) {
        expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('Booking Cab', () => {
    let cabStub: any;
    let rideStub: any;

    before(() => {
      cabStub = testHelper.createStub(CabModel, 'getSingle');
      rideStub = testHelper.createStub(RideModel, 'addOne');
    });

    it('should return access denied while booking cab', async () => {
      try {
        let res = await testHelper.chaiPostRequest('/cab/api/v1/book', {
          cab_id: '1',
          src_lat: '23.102071',
          src_lng: '72.589632',
          dest_lat: '23.068988',
          dest_lng: '72.580277',
          fare: '100'
        });
        expect(res).to.have.status(STATUS_CODES.FORBIDDEN);
      } catch (error) {
        expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
    });

    it('should return unprocessable entity', async () => {
      try {
        let res = await testHelper.chaiPostRequest('/cab/api/v1/book', {}, 'Authorization', process.env.AUTH_TOKEN);
        expect(res).to.have.status(STATUS_CODES.UNPROCESSABLE_ENTITY);
      } catch (error) {
        expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
    });

    it('should return car not found', async () => {
      try {
        cabStub.callsFake(() => Promise.resolve(0));
        let res = await testHelper.chaiPostRequest(
          '/cab/api/v1/book',
          {
            cab_id: '101',
            src_lat: '23.102071',
            src_lng: '72.589632',
            dest_lat: '23.068988',
            dest_lng: '72.580277',
            fare: '100'
          },
          'Authorization',
          process.env.AUTH_TOKEN
        );
        expect(res).to.have.status(STATUS_CODES.UNPROCESSABLE_ENTITY);
      } catch (error) {
        expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
    });

    it('should return cab booked', async () => {
      try {
        cabStub.callsFake(() =>
          Promise.resolve({
            cab_id: 1,
            driver_id: 3,
            cab_no: 'MH12UF6541',
            cab_lat: 23.099155,
            cab_lng: 72.588593,
            on_trip: 0
          })
        );

        rideStub.callsFake(() => Promise.resolve(1));

        let res = await testHelper.chaiPostRequest(
          '/cab/api/v1/book',
          {
            cab_id: '1',
            src_lat: '23.102071',
            src_lng: '72.589632',
            dest_lat: '23.068988',
            dest_lng: '72.580277',
            fare: '100'
          },
          'Authorization',
          process.env.AUTH_TOKEN
        );
        expect(res).to.have.status(STATUS_CODES.OK);
      } catch (error) {
        expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
