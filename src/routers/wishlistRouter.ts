import express, { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { Book } from "../models/bookModel";
import { Wishlist, WishlistModel } from "../models/wishlistModel";
import { WishlistService } from "../services/wishlistService";
import passport from "passport";

export function createWishlistRouter() {
    const router = express.Router();
    const wishlistService = new WishlistService();

    router.get("/", (req: Request, res: Response) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {

            try {
                const userWishlist = new WishlistModel({
                    userId: user._id,
                })
            } catch(err) {
                res.status(500).send({error: err.message});
            }
        })(req, res);
    });

    router.post("/books", (req: Request, res: Response) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (!user) {
                res.status(401).send({error: "Error! Authentication is required to access this resource"})
            }

            try {
                const bookIds: string[] = req.body.bookIds;
                const wishlist = await wishlistService.addToWishlist(bookIds, user.id);
                console.log(wishlist);

                res.send(wishlist);
            } catch(err) {
                console.log(err);
                res.status(500).send({error: err.message});
            }
        })(req, res);
    });

    return router;
}