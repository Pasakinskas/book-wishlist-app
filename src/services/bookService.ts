import { BookModel, Book } from "../models/bookModel";

export class BookService {
    async getAllBooks(limit: number = 0, skip: number = 0): Promise<Book[]> {
        return BookModel.find()
            .limit(limit)
            .skip(skip)
    }

    async getBookById(id: string) {
        const book = await BookModel.findById(id);

        if (book) {
            return book;
        } else {
            throw new Error("No book with such id");
        }
    }

    createBookFromValues(name: string, author: string, pages: number) {
        const bookModel: Book = new BookModel({
            name,
            author,
            pages
        });

        bookModel.validate();
        return bookModel.save();
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