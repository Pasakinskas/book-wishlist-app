import { UserModel, User } from "../models/userModel";
import bcryptjs from 'bcryptjs';

export class UserService {
    async getAllUsers(): Promise<User[]> {
        return UserModel.find();
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await UserModel.findOne({ email });

        if (user) {
            return user;
        } else {
            throw new Error("User not found");
        }
    }

    async getUserById(id: string) {
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

    async createUserWithValues(email: string, password: string): Promise<User> {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const userModel: User = new UserModel({
            email: email,
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