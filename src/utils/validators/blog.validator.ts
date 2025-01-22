import {body, param} from 'express-validator';

export const createBlog = [
    body('content')
    .notEmpty().withMessage('The content shouldn\'t be empty.')
];

export const patchBlog = [
    param('id')
    .isMongoId().withMessage('The id should be a mongodb id'),
    body('content')
    .notEmpty().withMessage('The content shouldn\'t be empty.')
];

export const deleteBlog = [
    param('id')
    .isMongoId().withMessage('The id should be a mongodb id')
];