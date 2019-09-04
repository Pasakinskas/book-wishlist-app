import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { createServer }  from "../../src/app";
import chaiHttp from "chai-http";
import { Server } from "http";
import { getJwtToken } from "../testUtils";

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const { expect } = chai;

describe("Testing route", async () => {
    let server: Server;

    before( async () => {
        server = await createServer();
    });

    after(() => {
        (server as any).close()
    });

    it("GET /books", async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNmU3MjljNjk0NWZlMjgzY2I2NmQyYiIsImVtYWlsIjoiUGFzc3dvcmQxMjNAZW1haWwuY29tIiwiaWF0IjoxNTY3NTM4NTI5fQ.KiFkHQ_yrwcuIyCNHLf0w0LD7-gq6WRZfER2rCtJN7U";
        const res = await chai.request(server).get("/api/books")
            .query({wishlist: "true"})
            .set("x-access-token", token);

        expect(res).to.have.status(200);
        // expect(res.body).to.be.an('array');
    });
});