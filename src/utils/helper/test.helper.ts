import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import { restore, stub } from 'sinon';
import app from '../../app';

use(chaiHttp);

class TestHelper {
  public chaiPostRequest(url: string, params: any, headerKey = '', headerValue = '') {
    if (!headerKey) {
      return chai
        .request(app)
        .post(url)
        .send(params)
        .then((res) => {
          return res;
        });
    } else {
      return chai
        .request(app)
        .post(url)
        .send(params)
        .set(headerKey, headerValue)
        .then((res) => {
          return res;
        });
    }
  }

  public chaiGetRequest(url: string, params: any, headerKey = '', headerValue = '') {
    if (!headerKey) {
      return chai
        .request(app)
        .get(url)
        .query(params)
        .then((res) => {
          return res;
        });
    } else {
      return chai
        .request(app)
        .get(url)
        .query(params)
        .set(headerKey, headerValue)
        .then((res) => {
          return res;
        });
    }
  }

  public createStub(file: any, method: any) {
    return stub(file, method);
  }

  public restore() {
    return restore();
  }

  public checkValidOutput(res: any) {
    return (
      expect(res).to.be.not.null &&
      expect(res).to.be.json &&
      expect(res.body).to.be.a('object') &&
      expect(res.body).to.have.property('message')
    );
  }
}

export const testHelper = new TestHelper();
