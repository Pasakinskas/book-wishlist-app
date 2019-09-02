import express, { Application } from "express";
import bodyParser from "body-parser";
import config from "../src/config/config";
import "./db/database";
import { createUserRouter } from "../src/routers/userRouter";

class App {
    static createServer(port: number) {
        const app: Application = express();

        app.use(bodyParser.json({ type: 'application/json' }));
        app.use("/api/users", createUserRouter());

        return app.listen(port, () => {
            console.log(`listening on port: ${config.port}`);
        });
    }
}

export = App;