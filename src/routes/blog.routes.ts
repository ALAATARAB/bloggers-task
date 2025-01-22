import express from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import BlogController from '../controllers/blog.controller';
import { isAuth } from '../middlewares/isAuth.middleware';
import * as validator from '../utils/validators/blog.validator';
import { isAdmin } from '../middlewares/isAdmin.middleware';
const router = express.Router();
const blogController = new BlogController();

/**
 * @swagger
 * tags:
 *   name: Blogs 📃
 *   description: End-Points for Blogs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *      type: object
 *      required:
 *        - userId
 *        - content
 *        - _id
 *      properties:
 *        userId:
 *          type: string
 *          description: The Id of the owner
 *        content:
 *          type: string
 *          description: The content of the blog
 *        _id:
 *          type: ObjectId
 *          description: The Id of the blog
 *      example:
 *        userId: 678f8cf6894a9c6ea7f5002a
 *        content: This is the blog's content 
 *        _id: 678f8cf6894a9c6ea7f50z2b
 */

/**
 * @swagger
 * '/api/blogs':
 *   post:
 *     summary: create a new blog
 *     tags: [Blogs 📃]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *             example:
 *               content: This is the content
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Bad request (Incomplete data)
 *       401:
 *         description: Unauthorized (The user isn't authorized)
 *       500:
 *         description: Server Error
 *   get:
 *     summary: Get all Blogs
 *     tags: [Blogs 📃]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page which we are in
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: limit
 *         in: query
 *         description: Number of results to return
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Server Error
 */
router.post('/',isAuth,validator.createBlog,validationMiddleware,blogController.post);
router.get('/',validationMiddleware,blogController.get);

/**
 * @swagger
 * '/api/blogs/{id}':
 *  patch:
 *    summary: Update the blog by the owner
 *    tags: [Blogs 📃]
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the blog
 *       required: true
 *       example:
 *         6745ebba3718fdd78ee1b41f
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            type: object
 *            required:
 *              - content
 *            properties:
 *              content:
 *                type: string
 *            example:
 *              content: The new Content
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *      400:
 *        description: Bad request (Incomplete data)
 *      401:
 *        description: Unauthorized (The user isn't the owner)
 *      404:
 *        description: Not Found (The blog doesn't exist)
 *      500:
 *        description: Server Error
 *  delete:
 *    summary: Delete the blog
 *    tags: [Blogs 📃]
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the blog
 *       required: true
 *       example:
 *          6745ebba3718fdd78ee1b41f
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *  
 */
router.patch('/:id',isAuth,validator.patchBlog,validationMiddleware,blogController.update);
router.delete('/:id',isAdmin,validator.deleteBlog,validationMiddleware,blogController.delete);

export default router;