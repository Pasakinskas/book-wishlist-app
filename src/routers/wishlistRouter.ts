import express, { Request, Response } from "express";
import { WishlistService } from "../services/wishlistService";
import passport from "passport";
import { authMiddleware } from "../auth/authMiddleware";
import { User } from "../models/userModel";

export function createWishlistRouter() {
    const router = express.Router();
    const wishlistService = new WishlistService();

    router.get("/", authMiddleware, async (req: Request, res: Response) => {
        try {
            const user = req.user as User;
            const wishlist = await wishlistService.getWishlistByUserId(user.id);
            res.send(wishlist);
        } catch(err) {
            res.status(500).send({error: err.message});
        }
    });

    router.post("/books", authMiddleware, async (req: Request, res: Response) => {
        try {
            const user = req.user as User;
            const bookIds: string[] = req.body.bookIds;
            const wishlist = await wishlistService.addToWishlist(bookIds, user.id);

            res.send(wishlist);
        } catch(err) {
            console.log(err);
            res.status(500).send({error: err.message});
        }
    });

    router.delete("/books", authMiddleware, async (req: Request, res: Response) => {
        try {
            const user = req.user as User;
            const bookIds: string[] = req.body.bookIds;
            const wishlist = await wishlistService.removeFromWishlist(bookIds, user.id);

            res.send(wishlist);
        } catch(err) {
            console.log(err);
            res.status(500).send({error: err.message});
        }
    });

    return router;
}