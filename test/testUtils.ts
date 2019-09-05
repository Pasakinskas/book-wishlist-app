import { UserModel } from "../src/models/userModel";
import { BookModel } from "../src/models/bookModel";
import { WishlistModel } from "../src/models/wishlistModel";
import { BookService } from "../src/services/bookService";
import { UserService } from "../src/services/userService";


export class TestUtils {
    async scrubDatabaseData() {
        await Promise.all([
            await UserModel.deleteMany({}),
            await BookModel.deleteMany({}),
            await WishlistModel.deleteMany({}),
        ]);
    }

    async addMockUsers() {
        const userService = new UserService();
        await Promise.all([
            userService.createUserWithValues("testUser1@email.com", "testUser1"),
            userService.createUserWithValues("poweruser2@email.com", "poweruser2"),
            userService.createUserWithValues("omegauser3@email.com", "omegauser3"),
            userService.createUserWithValues("alphauser4@email.com", "alphauser4"),
            userService.createUserWithValues("tornadouser5@email.com", "tornadouser5"),
        ]);
    }

    async addMockBooks() {
        const bookService = new BookService();
        await Promise.all([
            bookService.createBookFromValues("20000 Leagues", "Author M", 200),
            bookService.createBookFromValues("400 Yards", "Author B", 400),
            bookService.createBookFromValues("20 Miles", "Author K", 432),
            bookService.createBookFromValues("233 metres", "Author R", 285),
            bookService.createBookFromValues("20 Inches", "Author A", 366),
        ]);
    }

    async mockDataForTesting() {
        await Promise.all([
        await this.scrubDatabaseData(),
        await this.addMockUsers(),
        await this.addMockBooks(),
    ]);
    }
}