import mongoose from "mongoose";

export function initDatabase() {
    const dbURI: string = process.env.DATABASE ||
    "mongodb://user1:alegory13@ds115592.mlab.com:15592/back-marius-pas";

    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true
        }
    );
}
