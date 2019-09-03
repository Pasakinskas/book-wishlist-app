import { Strategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../models/userModel";
import dotenv from "dotenv";
import { PassportStatic } from "passport"

dotenv.config();

const secret = process.env.SECRET || 'thiswillbeadefaultsecretjustincase';

const opts = {
    jwtFromRequest: ExtractJwt.fromHeader("x-access-token"),
    secretOrKey: secret
};

export const passportConfig = (passport: PassportStatic) => {
    passport.use(
        new Strategy(opts, async (payload, done) => {
            try {
                const user = await UserModel.findById(payload.id);

                if (user) {
                    return done(null, {
                        id: user._id,
                        email: user.email
                    })
                } else {
                    return done(null, false);
                }
            } catch(err) {
                console.error(err)
            }
        })
    )};