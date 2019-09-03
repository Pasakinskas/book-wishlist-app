import express, { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { Book } from "../models/bookModel";

export function createBookRouter() {
    const router = express.Router();
    const bookService = new BookService();

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