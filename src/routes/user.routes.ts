import express from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import UserController from '../controllers/user.controller';
import { isAdmin } from '../middlewares/isAdmin.middleware';
import * as validator from '../utils/validators/user.validator';
const router = express.Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users 🧑🏻
 *   description: End-Points for Users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *      type: object
 *      required:
 *        - _id
 *        - username
 *        - email
 *        - password
 *        - role
 *      properties:
 *        _id:
 *          type: ObjectId
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        role:
 *          type: string
 *      example:
 *        _id: ObjectId
 *        username: string
 *        email: string
 *        password: $
 *        role: string
 *     createUser:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: number
 *        password:
 *          type: number
 *      example:
 *        username: Omar
 *        email: omar@gmail.com
 *        password: strongPassword
 *     findUser:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *      example:
 *        email: omar@gmail.com
 *        password: strongPassword
 * 
*/

/**
 * @swagger
 * /api/users/promote:
 *   post:
 *     summary: promote a user by an admin
 *     tags: [Users 🧑🏻]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          type: object
 *          required:
 *            - id
 *          properties:
 *            id:
 *              type: string
 *          example:
 *            id: 678f8cf6894a9c6ea7f5002a
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            type: object
 *              - message
 *            properties:
 *              message:
 *                type: string
 *            example:
 *              message: User promoted successfully
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
router.post('/promote',isAdmin,validator.promote,validationMiddleware,userController.promote);

export default router;