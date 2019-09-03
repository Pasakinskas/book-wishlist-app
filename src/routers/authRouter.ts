import express, { Request, Response } from "express";
import { User } from "../models/userModel";
import { AuthService } from "../services/authService";
import { validatePostedUser } from "../auth/validation/postUserData";

export function authUserRouter() {
    const router = express.Router();
    const authService = new AuthService();

    router.post("/", async (req: Request, res: Response) => {
        const validatedUser: User = validatePostedUser(req.body);
        try {

            const userJwtToken: string = await authService.authenticate(validatedUser);
            res.send({
                success: true,
                token: userJwtToken
            })

        } catch(err) {
            res.status(401).send({error: err.message});
        }
    });

    return router;
}
