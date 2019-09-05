import Joi from "@hapi/joi";
import validator from 'validator';

import { User, UserModel } from "../../models/userModel";

export function validatePostedUser(loginData: any): User {
    const schema = {
        email: Joi.string().min(6).max(25).required().email(),
        password: Joi.string().min(6).max(30).required()
    }

    const validationResult: any = Joi.validate(loginData, schema).value;
    const { email, password } = validationResult;

    return new UserModel({
        email: sanitize(email),
        password: sanitize(password)
    })
}

function sanitize(str: string): string {
    return validator.blacklist(str.trim(), "\\/<>\\!#$%0\\^\\&\\*\\(\\)");
}
