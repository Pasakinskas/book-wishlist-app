import mongoose  from "mongoose";
import config from "../config/config";

class Database {

    constructor() {
        this._connect();
    }

    async _connect() {
        try {
            const connection = await mongoose.connect(config.dbURI.dev, { useNewUrlParser: true });
            console.log("db connection successful");
        } catch (error) {
            console.error(error);
        };
    }

}

export = new Database();
