import mongoose  from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class Database {

    private dbURI: string = process.env.DATABASE ||
        "mongodb://user1:alegory13@ds115592.mlab.com:15592/back-marius-pas";

    constructor() {
        this._connect();
    }

    async _connect() {
        try {
            await mongoose.connect(this.dbURI, {
                useNewUrlParser: true,
                useCreateIndex: true
                }
            );

            console.log("db connection successful");
        } catch (error) {
            console.error(error);
        };
    }

}

export = new Database();
