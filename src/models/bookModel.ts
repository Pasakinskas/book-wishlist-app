import mongoose from "mongoose";

export interface Book extends mongoose.Document {
    name: string;
    author: string;
    pages: number;
}

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        min: 1,
        max: 9999
    }
});

export const BookModel = mongoose.model<Book>('Book', schema);
