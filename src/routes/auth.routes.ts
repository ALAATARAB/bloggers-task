import express from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import AuthController from '../controllers/auth.controller';
import * as validator from '../utils/validators/auth.validator';
const router = express.Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Auth 🛑
 *   description: End-Points for Auth
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: register for the first time
 *     tags: [Auth 🛑]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createUser'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request (incomplete data / email exists)
 *      500:
 *        description: Server Error
 */
router.post('/signup',validator.signup,validationMiddleware,authController.signUp);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login with an existed email
 *     tags: [Auth 🛑]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/findUser'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request (incomplete data)
 *      401:
 *        description: Unauthorized (wrong password or email)
 *      404:
 *        description: Not Found (There is no email such that)
 *      500:
 *        description: Server Error
 */
router.post('/login',validator.login,validationMiddleware,authController.logIn);


export default router;