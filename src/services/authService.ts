import { User, UserModel } from "../models/userModel";
import { UserService } from "../services/userService";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';

export class AuthService {
    private secret = process.env.SECRET || 'thiswillbeadefaultsecretjustincase';

    generateJWTtoken(user: User): string {
        const payload = {
            id: user._id.toString(),
            email: user.email
        };

        return jwt.sign(payload, this.secret);
    }

    private async getAuthenticatedUserData(user: User): Promise<User> {
        const userService = new UserService();
        const userInDB: User = await userService.getUserByEmail(user.email);

        if (userInDB) {
            const isPasswordCorrect: boolean = await bcryptjs.compare(user.password, userInDB.password);
            if (isPasswordCorrect) {
                return userInDB;
            }
            throw new Error("Invalid username or password");
        }
        throw new Error("Invalid username or password");
    }

    async authenticate(user: User): Promise<string> {
        const userInDB: User = await this.getAuthenticatedUserData(user)
        if (userInDB) {
            return this.generateJWTtoken(userInDB);
        } else {
            throw new Error("Invalid username or password");
        }
    }
}