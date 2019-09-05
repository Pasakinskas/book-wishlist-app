import mongoose from "mongoose";

export function initDatabase() {
    const dbURI: string = process.env.DATABASE ||
    "mongodb://167.99.134.116:18897/testing";

    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true
        }
    );
}
