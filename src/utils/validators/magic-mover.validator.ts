import {body, param} from 'express-validator';
import { IMagicMover } from '../../interfaces/magic-mover.interface';

export const checkForId = [
    param('id')
    .isMongoId().withMessage('The id should be a mongodb id')
];

export const checkMagicMover = [
    body()
    .custom((magicMover: IMagicMover) => {
        if(!magicMover.name && !magicMover.weightLimit) throw new Error("The details of the mover isn't completed yet");
        return true;
    })
];

export const checkLoadingMover = [
    body()
    .custom((data: {id: string, itemIds: string[]}) => {
        const {id, itemIds} = data;
        if(!id || itemIds.length === 0) throw new Error("The details for loading the mover is not completed yet")
        return true;
    })
];