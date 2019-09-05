import express, { Request, Response } from "express";
import { UserService } from "../services/userService";
import { validatePostedUser } from "../auth/validation/postUserData";
import { User } from "../models/userModel";
import passport from "passport";

export function createUserRouter() {
    const router = express.Router();
    const userService = new UserService();

    router.get("/:id", async (req: Request, res: Response) => {
        try {
            const user: User = await userService.getUserById(req.params.id);
            res.send(user);
        } catch {
            res.status(404).send({error: "No user found"});
        }
    });

    router.post("/", async (req: Request, res: Response) => {
        try {
            const validatedUser = validatePostedUser(req.body);
            const user: User = await userService.createUser(validatedUser);

            res.status(201).send({
                email: user.email,
                id: user._id
            })
        } catch(err) {
            res.status(400).send({error: err.message});
        }
    });

    router.delete("/:id", async (req: Request, res: Response) => {
        try {
            const user: User = await userService.deleteUser(req.params.id);
            res.status(204).send({});
        } catch(err) {
            res.status(404).send({error: err.message});
        }
    });

    return router;
}