import { Application } from 'express';
import CabRoutes from '../component/cab';
import PublicRoutes from '../component/public';
import UserRoutes from '../component/user';

/**
 * Init All routes here
 */
export default (app: Application) => {
  // Public Routes
  app.use('/public/api/v1', PublicRoutes);

  // Protected Routes
  app.use('/cab/api/v1', CabRoutes);
  app.use('/user/api/v1', UserRoutes);
};
