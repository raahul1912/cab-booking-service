import { Request, Response, Router } from 'express';
import { isUserAuthenticated } from '../../middlewares/authMiddleware';
import CabController from './cab.controller';
import CabValidations from './cab.validations';
const router = Router();

/**
 * Cab booking
 * @route POST /cab/api/v1/nearby
 * @group Cab - API related to Cab routes
 * @param {NearbyCab.model} body.body - Body
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
/**
 * @typedef NearbyCab
 * @property {float} cab_lat.required
 * @property {float} cab_lng.required
 */
router.post('/nearby', isUserAuthenticated, CabValidations.nearby, (req: Request, res: Response) => {
  CabController.nearby(req, res);
});

/**
 * Cab booking
 * @route POST /cab/api/v1/book
 * @group Cab - API related to Cab routes
 * @param {CabBooking.model} body.body - Body
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
/**
 * @typedef CabBooking
 * @property {number} cab_id.required
 * @property {float} src_lat.required
 * @property {float} src_lng.required
 * @property {float} dest_lat.required
 * @property {float} dest_lng.required
 * @property {float} fare.required
 */
router.post('/book', isUserAuthenticated, CabValidations.book, (req: Request, res: Response) => {
  CabController.book(req, res);
});

export default router;
