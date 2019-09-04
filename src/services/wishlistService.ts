import { WishlistModel, Wishlist } from "../models/wishlistModel";
import mongoose from "mongoose";
import { BookService } from "./bookService";

export class WishlistService {
    async getWishlistByUserId(userId: string): Promise<Wishlist> {
        const wishlist = await WishlistModel
            .findOne({ userId: mongoose.Types.ObjectId(userId) })
            .populate("books")

        if (wishlist) {
            return wishlist;
        } else {
            return this.createWishlist(userId);
        }
    }

    createWishlist(userId: string) {
        const wishlist = new WishlistModel({
            userId
        })

        wishlist.save();
        return wishlist;
    }

    async removeFromWishlist() {}

    async addToWishlist(bookIds: string[], userId: string): Promise<Wishlist> {
        const bookService = new BookService();
        const wishlist = await this.getWishlistByUserId(userId);

        for (const bookId of bookIds) {
            const book = await bookService.getBookById(bookId);
            if (book) {
                wishlist.books.push(book);
            }
        }

        wishlist.save();
        return wishlist;
    }
}