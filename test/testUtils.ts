import jwt from "jsonwebtoken";
import { UserModel } from "../src/models/userModel";
import { AuthService } from "../src/services/authService";


export function getJwtToken() {
    const authService = new AuthService();
    return authService.generateJWTtoken(new UserModel({
        email: "testuser@test.com",
        password: "testuser"
    }));
}