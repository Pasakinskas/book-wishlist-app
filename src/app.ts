import express, { Application } from "express";
import bodyParser from "body-parser";
import passport from "passport";
import { passportConfig } from "./auth/passportConfig";
import { createUserRouter } from "./routers/userRouter";
import { createBookRouter } from "./routers/bookRouter";
import { authUserRouter } from "./routers/authRouter";
import "./db/database";

import dotenv from "dotenv";

dotenv.config();

class App {

    static createServer() {
        const app: Application = express();

        app.use(bodyParser.json({ type: 'application/json' }));
        app.use(passport.initialize());

        app.use("/api/users", createUserRouter());
        app.use("/api/books", createBookRouter());
        app.use("/api/auth", authUserRouter());

        passportConfig(passport);

        return app.listen(process.env.PORT || 8080, () => {
            console.log(`listening on port: ${process.env.PORT}`);
        });
    }
}

export = App;