import express, { Request, Response } from "express";
import { User, UserModel } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';

export function authUserRouter() {
    const router = express.Router();
    const secret = process.env.SECRET || 'thiswillbeadefaultsecretjustincase';

    router.post("/", async (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const user: User | null = await UserModel.findOne({ email });

        if (user) {
            const isPasswordCorrect = await bcryptjs.compare(password, user.password);

            if (isPasswordCorrect) {
                const payload = {
                    id: user._id,
                    email: user.email
                 };
                 try {
                    const jwtToken: string = await jwt.sign(payload, secret);
                    res.send({
                        success: true,
                        token: jwtToken
                    })
                } catch(err) {
                    res.status(500).send({error: err});
                }
            }
        } else {
            res.status(404).send({message: "invalid username or pasword"})
        }
    });

    return router;
}
