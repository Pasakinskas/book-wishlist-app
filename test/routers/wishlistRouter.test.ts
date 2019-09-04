import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { createServer }  from "../../src/app";
import chaiHttp from "chai-http";
import { Server } from "http";

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const { expect } = chai;

describe("Testing route", async () => {
    let server: Server;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNmU3MjljNjk0NWZlMjgzY2I2NmQyYiIsImVtYWlsIjoiUGFzc3dvcmQxMjNAZW1haWwuY29tIiwiaWF0IjoxNTY3NTM4NTI5fQ.KiFkHQ_yrwcuIyCNHLf0w0LD7-gq6WRZfER2rCtJN7U"
    // const token = await getJwtToken();

    before(() => {
        server = createServer();
    });

    after(() => {
        server.close();
    });

    it("GET /wishlist", async () => {
        const res = await chai.request(server).get("/api/my-wishlist")
            .set("x-access-token", token)

        expect(res).to.have.status(200);
    });

    it("DELETE /wishlist/books", async () => {
        const res = await chai.request(server).post("/api/my-wishlist/books")
            .set("x-access-token", token)
            .send({bookIds: [
                "5d6eb6ac142c8513d471182a"
            ]
            })

        expect(res).to.have.status(200);
        // expect(res.body).to.be.an('array');
    });

    it("POST /wishlist/books", async () => {
        const res = await chai.request(server).post("/api/my-wishlist/books")
            .set("x-access-token", token)
            .send({bookIds: [
                "5d6eb6ac142c8513d471182a"
            ]
            })

        expect(res).to.have.status(200);
        // expect(res.body).to.be.an('array');
    });
});