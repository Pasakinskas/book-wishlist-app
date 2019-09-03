import express, { Application } from "express";
import bodyParser from "body-parser";
import passport from "passport";
import { passportConfig } from "./auth/passportConfig";
import { createUserRouter } from "../src/routers/userRouter";
import { authUserRouter } from "../src/routers/authRouter";
import "./db/database";

import dotenv from "dotenv";

dotenv.config();

class App {

    static createServer() {
        const app: Application = express();

        app.use(bodyParser.json());
        app.use(passport.initialize());

        app.use("/api/users", createUserRouter());
        app.use("/api/auth", authUserRouter());

        passportConfig(passport);

        return app.listen(process.env.PORT || 8080, () => {
            console.log(`listening on port: ${process.env.PORT}`);
        });
    }
}

export = App;