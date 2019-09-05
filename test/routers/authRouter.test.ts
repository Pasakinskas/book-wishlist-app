import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { createServer }  from "../../src/app";
import chaiHttp from "chai-http";

import { Server } from "http";
import { TestUtils } from "../testUtils"

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const { expect } = chai;

describe("Testing authentication", () => {
    let server: Server = createServer();

    before(async () => {
        server = createServer();
        const testUtils = new TestUtils();
        await testUtils.mockDataForTesting();
    });

    after(() => {
        server.close();
    });

    it("Correct login POST /api/auth", async () => {
        const res = await chai.request(server).post("/api/auth").send({
            email: "testUser1@email.com",
            password: "testUser1"
        });

        expect(res).to.have.status(200);
    })

    it("Bad login attempt POST /api/auth", async () => {
        const res = await chai.request(server).post("/api/auth").send({
            email: "authExample@email.com",
            password: "badpass"
        });

        expect(res).to.have.status(401);
    })



    server.close();
})