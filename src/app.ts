import express, { Application } from "express";
import bodyParser from "body-parser";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";

import { passportConfig } from "./auth/passportConfig";
import { createUserRouter } from "./routers/userRouter";
import { createBookRouter } from "./routers/bookRouter";
import { createWishlistRouter } from "./routers/wishlistRouter";
import { authUserRouter } from "./routers/authRouter";
import { initDatabase } from "./db/database";

dotenv.config();

export function createServer() {
    const app = express();

    initDatabase();

    app.use(cors());
    app.use(bodyParser.json({ type: 'application/json' }));
    app.use(passport.initialize());

    app.use("/api/users", createUserRouter());
    app.use("/api/books", createBookRouter());
    app.use("/api/auth", authUserRouter());
    app.use("/api/my-wishlist", createWishlistRouter());

    passportConfig(passport);

    return app.listen(process.env.PORT || 8080, () => {
        console.log(`listening on port: ${process.env.PORT}`);
    });
}
