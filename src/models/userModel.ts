import mongoose from "mongoose";
import validator from "validator";

export interface User extends mongoose.Document {
    email: string;
    password: string;
}

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value: string) => {
            return validator.isEmail(value)
        }
    },
    password: { type: String, required: true },
});

export const UserModel = mongoose.model<User>('User', schema);
