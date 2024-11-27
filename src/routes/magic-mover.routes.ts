import express from 'express';
import { checkForId, checkLoadingMover, checkMagicMover } from '../utils/validators/magic-mover.validator';
import validationMiddleware from '../middlewares/validation.middleware';
import { container } from 'tsyringe';
import MagicMoverController from '../controllers/magic-mover.controller';
const router = express.Router();
const magicMoverController = container.resolve(MagicMoverController);


/**
 * @swagger
 * tags:
 *   name: Magic Movers 🦸‍♂️
 *   description: End-Points for Magic Movers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MagicMover:
 *      type: object
 *      required:
 *        - name
 *        - weightLimit
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id by mongoDb
 *        name:
 *          type: string
 *          description: The name of the magic mover
 *        weightLimit:
 *          type: number
 *          description: The weight limit of the magic mover
 *        usedWeight:
 *          type: number
 *          description: The weight which the magic mover hold
 *        completedMissions:
 *          type: number
 *          description: The missions which are completed by the magic mover
 *        state:
 *          type: enum("Resting","Loading","On_Mission")
 *          description: The state of the magic mover
 *      example:
 *        name: SuperMan
 *        weightLimit: 200
 *        usedLimit: 0
 *        completedMissions: 0
 *        state: Resting
 */

/**
 * @swagger
 * /api/magic-movers:
 *   post:
 *     summary: Create a new magic mover
 *     tags: [Magic Movers 🦸‍♂️]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MagicMover'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/MagicMover'
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server Error
 */
router.post('/',checkMagicMover,validationMiddleware,magicMoverController.post)


/**
 * @swagger
 * /api/magic-movers/load:
 *   post:
 *     summary: Load magic mover with multiple magic items
 *     tags: [Magic Movers 🦸‍♂️]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         example:
 *          "id": 6746267e60fe56863c091b23
 *          "itemIds": ["674628b44f4390dd723bf30d","674628ba4f4390dd723bf30f"]
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/MagicMover'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.post('/load',checkLoadingMover,validationMiddleware,magicMoverController.loadItems);


/**
 * @swagger
 * /api/magic-movers/start-mission/{id}:
 *   post:
 *     summary: Start mission for this magic mover
 *     tags: [Magic Movers 🦸‍♂️]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the magic mover
 *        required: true
 *        example:
 *          6745ebba3718fdd78ee1b41f
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/MagicMover'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.post('/start-mission/:id',checkForId,validationMiddleware,magicMoverController.startMission);

/**
 * @swagger
 * /api/magic-movers/end-mission/{id}:
 *   post:
 *     summary: End the mission for the magic mover
 *     tags: [Magic Movers 🦸‍♂️]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the magic mover
 *        required: true
 *        example:
 *          6745ebba3718fdd78ee1b41f
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/MagicMover'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.post('/end-mission/:id',checkForId,validationMiddleware,magicMoverController.endMission);

/**
 * @swagger
 * /api/magic-movers/most-completed-missions:
 *   get:
 *     summary: Get the magic movers ordered by completed missions
 *     tags: [Magic Movers 🦸‍♂️]
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/MagicMover'
 *      500:
 *        description: Server Error
 */
router.get('/most-completed-missions',magicMoverController.getMostActiveMovers);    


/**
 * @swagger
 * '/api/magic-movers/{id}':
 *  get:
 *    summary: Get the magic mover
 *    tags: [Magic Movers 🦸‍♂️]
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the magic mover
 *       required: true
 *       example:
 *         6745ebba3718fdd78ee1b41f
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MagicMover'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get('/:id',checkForId,validationMiddleware,magicMoverController.getById);
    
export default router;