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

describe('user', () => {
  let rideCountStub: any;
  let rideStub: any;

  before(() => {
    rideCountStub = testHelper.createStub(RideModel, 'getTotal');
    rideStub = testHelper.createStub(RideModel, 'getMany');
  });

  const rideStubValue = [
    {
      ride_id: 1,
      driver_id: 3,
      user_id: 1,
      src_lat: 23.102072,
      src_lng: 72.58963,
      dest_lat: 23.068989,
      dest_lng: 72.580276,
      fare: 100,
      status: 1
    }
  ];
  const rideCountStubValue = 1;

  it('should return access denied while fetching nearby cabs', async () => {
    try {
      let res = await testHelper.chaiPostRequest('/user/api/v1/booking/history', {
        search: '{"active":"1"}',
        rowNumber: '1',
        recordsPerPage: '10',
        sortOrder: 'asc',
        sortBy: 'fare',
        showAll: true
      });
      expect(res).to.have.status(STATUS_CODES.FORBIDDEN);
    } catch (error) {
      expect(error).to.have.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  });

  it('should return history of bookings', async () => {
    try {
      rideCountStub.callsFake(() => Promise.resolve(rideCountStubValue));
      rideStub.callsFake(() => Promise.resolve(rideStubValue));
      let res = await testHelper.chaiPostRequest(
        '/user/api/v1/booking/history',
        {
          _search: '{"active":"1"}',
          rowNumber: '1',
          recordsPerPage: '10',
          sortOrder: 'asc',
          sortBy: 'fare',
          showAll: true
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
