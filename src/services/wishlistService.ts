import { WishlistModel, Wishlist } from "../models/wishlistModel";
import mongoose from "mongoose";
import { BookService } from "./bookService";

export class WishlistService {
    async getWishlistByUserId(userId: string): Promise<Wishlist> {
        const wishlist = await WishlistModel
            .findOne({ userId: mongoose.Types.ObjectId(userId) })
            .populate("books")

        return wishlist ? wishlist : this.createWishlist(userId);
    }

    createWishlist(userId: string) {
        const wishlist = new WishlistModel({
            userId
        })

        wishlist.save();
        return wishlist;
    }

    async removeFromWishlist(bookIds: string[], userId: string) {
        const bookService = new BookService();
        const wishlist = await this.getWishlistByUserId(userId);

        for (const bookId of bookIds) {
            wishlist.books.filter(bookInWishlist => {
                if (bookId === bookInWishlist._id.toString()) {
                    return bookInWishlist;
                }
            })
        }

        wishlist.save();
        return wishlist;
    }

    async deleteWishlist(userId: string){
        const wishlist = await this.getWishlistByUserId(userId);
        WishlistModel.findOneAndDelete(wishlist);
    }

    async addToWishlist(bookIds: string[], userId: string): Promise<Wishlist> {
        const bookService = new BookService();
        const wishlist = await this.getWishlistByUserId(userId);
        const filteredBookIds = this.removeExistingBookIds(bookIds, wishlist);

        filteredBookIds.forEach(async (bookId) => {
            const book = await bookService.getBookById(bookId);
            if (book) {
                wishlist.books.push(book);
            }
        });
        wishlist.save();
        return wishlist;
    }

    removeExistingBookIds(bookIds: string[], wishlist: Wishlist): string[] {
        return bookIds.filter(bookId => {
            let isBookInWishlist: boolean = false;

            for (const bookInWishlist of wishlist.books) {
                if (bookId === bookInWishlist._id.toString()) {
                    isBookInWishlist = true;
                }
            }

            if (!isBookInWishlist) return bookId;
        })
    }
}