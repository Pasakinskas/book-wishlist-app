import mongoose from "mongoose";
import { WishlistModel, Wishlist } from "../models/wishlistModel";
import { Book } from "../models/bookModel";
import { BookService } from "./bookService";

export class WishlistService {
    async getWishlistByUserId(userId: string): Promise<Wishlist> {
        const wishlist = await WishlistModel
            .findOne({ userId: mongoose.Types.ObjectId(userId) })
            .populate("books")

        return wishlist || this.createWishlist(userId);
    }

    async createWishlist(userId: string) {
        const wishlist = new WishlistModel({
            userId
        })

        return wishlist.save();
    }

    async removeFromWishlist(bookIds: string[], userId: string) {
        const wishlist = await this.getWishlistByUserId(userId);
        wishlist.books.forEach(book => {
            if (!bookIds.includes(book._id.toString())) {
                wishlist.books.splice(wishlist.books.indexOf(book), 1);
            }
        })
        return wishlist.save();
    }

    async deleteWishlist(userId: string){
        const wishlist = await this.getWishlistByUserId(userId);
        WishlistModel.findOneAndDelete(wishlist);
    }

    async addToWishlist(bookIds: string[], userId: string): Promise<Wishlist> {
        const bookService = new BookService();
        const wishlist = await this.getWishlistByUserId(userId);
        const filteredBookIds = this.getOnlyNewBookIds(bookIds, wishlist.books);

        for (const bookId of filteredBookIds) {
            const book = await bookService.getBookById(bookId);
            if (book) {
                wishlist.books.push(book);
            }
        }
        return wishlist.save();
    }

    private getOnlyNewBookIds(bookIds: string[], books: Book[]): string[] {
        const currentIds = books.map(book => book._id.toString());
        return bookIds.filter(newId => !currentIds.includes(newId));
    }
}