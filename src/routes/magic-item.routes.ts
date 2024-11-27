import express from 'express';
import MagicItemController from '../controllers/magic-item.controller';
import { checkForId, checkMagicItem, checkUpdateMagicItem } from '../utils/validators/magic-item.validator';
import validationMiddleware from '../middlewares/validation.middleware';
import {container} from 'tsyringe';
const router = express.Router();
const magicItemController = container.resolve(MagicItemController)


/**
 * @swagger
 * tags:
 *   name: Magic Items 🎁
 *   description: End-Points for Magic Items
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MagicItem:
 *      type: object
 *      required:
 *        - name
 *        - weight
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id by mongoDb
 *        name:
 *          type: string
 *          description: The name of the magic item
 *        weight:
 *          type: number
 *          description: The weight of the magic item
 *      example:
 *        name: Box
 *        weight: 20
 */

/**
 * @swagger
 * /api/magic-items:
 *   post:
 *     summary: Create a new magic item
 *     tags: [Magic Items 🎁]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MagicItem'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/MagicItem'
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server Error
 */
router.post('/',checkMagicItem,validationMiddleware,magicItemController.post);
/**
 * @swagger
 * '/api/magic-items/{id}':
 *  get:
 *    summary: Get the magic item
 *    tags: [Magic Items 🎁]
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the magic item
 *       required: true
 *       example:
 *         6745ebba3718fdd78ee1b41f
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MagicItem'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *  patch:
 *    summary: Update the magic item
 *    tags: [Magic Items 🎁]
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the magic item
 *       required: true
 *       example:
 *         6745ebba3718fdd78ee1b41f
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MagicItem'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MagicItem'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *  delete:
 *    summary: Delete the magic item
 *    tags: [Magic Items 🎁]
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the magic item
 *       required: true
 *       example:
 *          6745ebba3718fdd78ee1b41f
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MagicItem'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *  
 */
router.get('/:id',checkForId,validationMiddleware,magicItemController.getById);
router.patch('/:id',checkForId,checkUpdateMagicItem,validationMiddleware,magicItemController.update);
router.delete('/:id',checkForId,validationMiddleware,magicItemController.delete);

export default router;