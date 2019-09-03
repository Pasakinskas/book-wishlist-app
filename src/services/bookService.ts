import { BookModel, Book } from "../models/bookModel";

export class BookService {
    async getAllBooks(): Promise<Book[]> {
        return BookModel.find();
    }

    async getBookById(id: string) {
        const book = await BookModel.findById(id);

        if (book) {
            return book;
        } else {
            throw new Error("No book with such id");
        }
    }

    createBook(book: Book): Promise<Book> {
        const bookModel: Book = new BookModel({
            name: book.name,
            author: book.author,
            pages: book.pages
        });

        bookModel.validate();
        return bookModel.save();
    }

    async deleteBook(id: string): Promise<Book> {
        const Book = await BookModel.findByIdAndDelete(id);

        if (Book) {
            return Book;
        } else {
            throw new Error("No such book");
        }
    }
}