import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";
import { Server } from "http";

import { createServer }  from "../../src/app";
import { TestUtils } from "../testUtils";

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const { expect } = chai;

describe("Testing route", async () => {
    let server: Server;
    let token: string;

    before(async () => {
        server = createServer();
        const testUtils = new TestUtils();
        await testUtils.mockDataForTesting();

    });

    after(() => {
        server.close();
    });

    it("GET /books whishlist=true", async () => {
        const loginResponse = await chai.request(server).post("/api/auth").send({
            email: "testUser1@email.com",
            password: "testUser1"
        });

        token = loginResponse.body.token

        const res = await chai.request(server)
            .get("/api/books")
            .query({wishlist: "true"})
            .set("x-access-token", token);

        expect(res).to.have.status(200);
    });

    it("GET /books limit=1 skip=1", async () => {
        const res = await chai.request(server)
        .get("/api/books")
        .query({limit: "1", skip: 1})
        .set("x-access-token", token);

    expect(res).to.have.status(200);
    })
});