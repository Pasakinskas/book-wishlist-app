import mongoose from "mongoose";
import { Book } from "./bookModel";

export interface Wishlist extends mongoose.Document {
    userId: string;
    books: Book[];
}

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    books: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
        default: []
    }
});

export const WishlistModel = mongoose.model<Wishlist>('Wishlist', schema);