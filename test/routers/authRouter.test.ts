import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { createServer }  from "../../src/app";
import chaiHttp from "chai-http";
import { Server } from "http";

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const { expect } = chai;

describe("Testing authentication", () => {
    const server: Server = createServer();
    let token: string;

    it("Correct login POST /api/auth", async () => {
        const loginResponse = await chai.request(server).post("/api/auth").send({
            email: "Password123@email.com",
            password: "Password123"
        });

        token = loginResponse.body.token;
    })

    it("GET all users with jwt auth", async () => {
        const res = await chai.request(server).get("/api/users").set("x-access-token", token);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    })

    it("Bad login attempt POST /api/auth", async () => {
        const res = await chai.request(server).post("/api/auth").send({
            email: "authExample@email.com",
            password: "asdas"
        });
    })

    server.close();
})