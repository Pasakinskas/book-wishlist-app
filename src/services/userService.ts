import { UserModel, User } from "../../src/models/userModel";
import bcryptjs from 'bcryptjs';

export class UserService {
    async getAllUsers(): Promise<User[]> {
        return UserModel.find();
    }

    async getUserById(id: string): Promise<User> {
        const user = await UserModel.findById(id);

        if (user) {
            return user;
        } else {
            throw new Error("User not found");
        }
    }

    async createUser(user: User): Promise<User> {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(user.password, salt);

        const userModel: User = new UserModel({
            email: user.email,
            password: hashedPassword
        });

        userModel.validate();
        return userModel.save();
    }

    async deleteUser(id: string): Promise<User> {
        const user = await UserModel.findByIdAndDelete(id);

        if (user) {
            return user;
        } else {
            throw new Error("User not found");
        }
    }
}