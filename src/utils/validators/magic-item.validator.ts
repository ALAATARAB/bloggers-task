import {body, param} from 'express-validator';
import { IMagicItem } from '../../interfaces/magic-item.interface';


export const checkForId = [
    param('id')
    .isMongoId().withMessage('The id should be a mongodb id')
];

export const checkMagicItem = [
    body()
    .custom((magicItem: IMagicItem) => {
        if(!magicItem.name || !magicItem.weight) throw new Error("The details of the magic item isn't completed yet");
        return true;
    })
];

export const checkUpdateMagicItem = [
    body()
    .custom((magicItem: IMagicItem) => {
        if(!magicItem.name && !magicItem.weight) throw new Error("The details of the magic item isn't completed yet");
        return true;
    })
];