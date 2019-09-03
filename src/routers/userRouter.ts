import express, { Request, Response } from "express";
import { UserService } from "../services/userService";
import { User } from "../models/userModel";
import passport from "passport";

export function createUserRouter() {
    const router = express.Router();
    const userService = new UserService();

    router.get("/", passport.authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
        try {
            const users = await userService.getAllUsers();
            res.send(users);
        } catch(err) {
            res.status(500).send(err);
        }
    });

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
            const user: User = await userService.createUser(req.body);
            res.status(201).send(user);
        } catch(err) {
            res.status(400).send({error: err});
        }
    });

    router.delete("/:id", async (req: Request, res: Response) => {
        try {
            const user: User = await userService.deleteUser(req.params.id);
            res.status(204).send({});
        } catch(err) {
            res.status(404).send({error: err});
        }
    });

    return router;
}