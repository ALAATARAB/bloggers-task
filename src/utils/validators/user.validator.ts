import { body, param } from 'express-validator';

export const promote = [
    body('id')
    .isMongoId().withMessage("You should enter a valid id")
];