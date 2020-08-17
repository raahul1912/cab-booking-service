import { Request, Response, Router } from 'express';
import { isUserAuthenticated } from '../../middlewares/authMiddleware';
import UserController from './user.controller';
import UserValidations from './user.validations';
const router = Router();

/**
 * User cab booking history
 * @route POST /user/api/v1/booking/history
 * @group User - API related to User routes
 * @param {BookingHistory.model} body.body - Body
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
/**
 * @typedef BookingHistory
 * @property {string} search
 * @property {number} rowNumber
 * @property {number} recordsPerPage
 * @property {string} sortBy
 * @property {string} sortOrder
 * @property {string} showAll
 */
router.post('/booking/history', isUserAuthenticated, UserValidations.history, (req: Request, res: Response) => {
  UserController.history(req, res);
});

export default router;
