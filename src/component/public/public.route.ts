import { Request, Response, Router } from 'express';
import PublicController from './public.controller';
import PublicValidations from './public.validations';
const router = Router();

/**
 * Login user
 * @route POST /public/api/v1/login
 * @group Public - API related to Public routes
 * @param {LoginUser.model} body.body - Body
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
/**
 * @typedef LoginUser
 * @property {string} email.required
 * @property {string} password.required
 */
router.post('/user/login', PublicValidations.login, (req: Request, res: Response) => {
  PublicController.userLogin(req, res);
});

/**
 * Register User
 * @route POST /public/api/v1/register
 * @group Public - API related to Public routes
 * @param {RegisterUser.model} body.body - Body
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
/**
 * @typedef RegisterUser
 * @property {string} user_name.required
 * @property {string} phone.required
 * @property {string} email.required
 * @property {string} password.required
 */
router.post('/user/register', PublicValidations.userRegister, (req: Request, res: Response) => {
  PublicController.userRegister(req, res);
});

/**
 * Login driver
 * @route POST /public/api/v1/driver/login
 * @group Public - API related to Public routes
 * @param {LoginDriver.model} body.body - Body
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
/**
 * @typedef LoginDriver
 * @property {string} email.required
 * @property {string} password.required
 */
router.post('/driver/login', PublicValidations.login, (req: Request, res: Response) => {
  PublicController.driverLogin(req, res);
});

/**
 * Register User
 * @route POST /public/api/v1/register
 * @group Public - API related to Public routes
 * @param {RegisterDriver.model} body.body - Body
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
/**
 * @typedef RegisterDriver
 * @property {string} driver_name.required
 * @property {string} phone.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} cab_no.required
 * @property {float} cab_lat.required
 * @property {float} cab_lng.required
 */
router.post('/driver/register', PublicValidations.driverRegister, (req: Request, res: Response) => {
  PublicController.driverRegister(req, res);
});

export default router;
