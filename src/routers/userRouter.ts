import express, { Request, Response } from "express";
import { UserService } from "../services/userService";
import { User } from "../models/userModel";

export function createUserRouter() {
    const router = express.Router();
    const userService = new UserService();

    router.get("/", async (req: Request, res: Response) => {
        try {
            const users = await userService.getAllUsers();
            res.send(users);
        } catch(err) {
            console.error(err);
            res.status(500);
            res.send(err);
        }
    });

    router.get("/:id", async (req: Request, res: Response) => {
        try {
            const user: User = await userService.getUserById(req.params.id);
            res.send(user);
        } catch {
            res.status(404);
            res.send({error: "No user found"});
        }
    });

    return router;
}