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

    router.post("/", async (req: Request, res: Response) => {
        try {
            const user: User = await userService.createUser(req.body);
            res.status(201);
            res.send(user);
        } catch(err) {
            res.status(400);
            res.send({error: err});
        }
    });

    router.delete("/:id", async (req: Request, res: Response) => {
        try {
            const user: User = await userService.deleteUser(req.params.id);
            res.status(204);
            res.send({});
        } catch(err) {
            res.status(404);
            res.send({error: err});
        }
    });

    return router;
}