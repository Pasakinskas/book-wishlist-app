import express, { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { WishlistService } from "../services/wishlistService";
import { Book } from "../models/bookModel";
import passport from "passport";

export function createBookRouter() {
    const router = express.Router();
    const bookService = new BookService();
    const wishlistService = new WishlistService();

    router.get("/", (req: Request, res: Response) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            const limit: number = parseInt(req.query.limit);
            const skip: number = parseInt(req.query.skip);

            if (!user) {
                res.status(401).send({error: "Error! Authentication is required to access this resource"})
            }

            if (req.query.wishlist && req.query.wishlist.toLowerCase() === "true") {
                const wishlist = await wishlistService.getWishlistByUserId(user.id);
                res.send(wishlist.books);
            } else {
                try {
                    const books = await bookService.getAllBooks(limit, skip);
                    res.send(books);

                } catch(err) {
                    res.status(500).send({error: err.message});
                }
            }
        })(req, res);
    });

    router.post("/", async (req: Request, res: Response) => {
        try {
            const book: Book = await bookService.createBook(req.body);
            res.status(201).send(book);

        } catch(err) {
            res.status(400).send({error: err.message});
        }
    });

    return router;
}