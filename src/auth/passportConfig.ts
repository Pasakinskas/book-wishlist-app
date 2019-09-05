import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { PassportStatic } from "passport"

import { UserModel } from "../models/userModel";

dotenv.config();

const secret = process.env.SECRET || 'thiswillbeadefaultsecretjustincase';

const opts = {
    jwtFromRequest: ExtractJwt.fromHeader("x-access-token"),
    secretOrKey: secret
};

export const passportConfig = (passport: PassportStatic) => {
    passport.use(
        new Strategy(opts, async (payload, done) => {
            const user = await UserModel.findById(payload.id);

            if (user) {
                return done(null, {
                    id: user._id,
                    email: user.email
                })
            } else {
                return done(null, false);
            }
        })
    )};