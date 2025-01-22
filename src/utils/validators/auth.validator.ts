import { body } from 'express-validator';
import IUser from '../../interfaces/user.interface';

export const signup = [
    
    body('username')
    .isLength({min:3,max:30}).withMessage("The username's length should be between 5 and 30 characters."),
    
    body('email')
    .isEmail().withMessage('The email is invalid'),
    
    body('password')
    .isStrongPassword({
        minLength: 8, 
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("The password should contain at least one (lower case letter, upper case letter, number, special character) with length 8 or more"),

    body().custom((userInfo: IUser) => {userInfo.role='user';return true;}),

];

export const login = [
    body('email')
    .isEmail().withMessage('The email is invalid'),

    body('password')
    .isStrongPassword({
        minLength: 8, 
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("The password should contain at least one (lower case letter, upper case letter, number, special character) with length 8 or more"),

];