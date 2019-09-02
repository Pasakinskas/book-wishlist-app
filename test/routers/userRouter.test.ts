import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import app from "../../src/app";
import chaiHttp from "chai-http";
import { Server } from "http";

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const { expect } = chai;

describe("Testing route", () => {
    const server: Server = app.createServer(8080);

    it("GET /users", async () => {
        const res = await chai.request(server).get("/api/users");
        expect(res).to.be.json;
    });

    it("GET /users/id", async () => {
        const res = await chai.request(server).get("/api/users/5d6d3bf685459b27c456a40f");
        expect(res).to.be.json;
    });

    server.close();
})