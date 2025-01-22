import jwt from 'jsonwebtoken';
import { HttpStatusCodes } from './httpStatusCodes';

export type tokenData = {userId: string, role: string};

export const assignToken = (payload: tokenData) : string => {
    let token = jwt.sign(payload,process.env.SECRET_KEY || "SECRET_KEY",{expiresIn:process.env.EXPIRY_TIME||"7d"});
    return token;
}

export const getData = (bearerToken: string) : tokenData => {
    let token = bearerToken;
    if (bearerToken.startsWith('Bearer'))         
        token = bearerToken.split(' ')[1];
    try {
        let data = jwt.verify(token,process.env.SECRET_KEY || "SECRET_KEY") as tokenData;
        return data;
    }
    catch(err) {
        throw {message:"The token isn't valid now log out and then log in.",statusCode:HttpStatusCodes.UNAUTHORIZED.code};
    }
}