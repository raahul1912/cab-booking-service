import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { Application } from 'express';
import { errorHandler } from './errorHandler';
import { rateLimiter } from './rateLimiter';

export default (app: Application) => {
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(rateLimiter);
  app.use(errorHandler);
};
