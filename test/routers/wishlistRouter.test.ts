import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";
import { Server } from "http";

import { createServer }  from "../../src/app";
import { TestUtils } from "../testUtils";
import { BookModel } from "../../src/models/bookModel";

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const { expect } = chai;

describe("Testing route", async () => {
    let server: Server;
    let token: string;
    let bookId: string;

    before(async () => {
        server = createServer();
        const testUtils = new TestUtils();
        await testUtils.mockDataForTesting();

        const book = await BookModel.findOne({name: '20000 Leagues'});
        if (book) {
            bookId = book._id;
        }
    });

    after(() => {
        server.close();
    });

    it("Login attempt", async () => {
        const loginResponse = await chai.request(server).post("/api/auth").send({
            email: "testUser1@email.com",
            password: "testUser1"
        });

        token = loginResponse.body.token
    })

    it("GET /wishlist", async () => {
        const res = await chai.request(server).get("/api/my-wishlist")
            .set("x-access-token", token)

        expect(res).to.have.status(200);
    });

    it("DELETE /wishlist/books", async () => {
        const res = await chai.request(server).delete("/api/my-wishlist/books")
            .set("x-access-token", token)
            .send({bookIds: [
                bookId
            ]
            })

        expect(res).to.have.status(200);
    });

    it("POST /wishlist/books", async () => {
        const res = await chai.request(server).post("/api/my-wishlist/books")
            .set("x-access-token", token)
            .send({bookIds: [
                bookId
            ]
            })

        expect(res).to.have.status(200);
    });
});