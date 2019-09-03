import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import app from "../../src/app";
import chaiHttp from "chai-http";
import { Server } from "http";

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const { expect } = chai;

describe("Testing authentication", () => {
    const server: Server = app.createServer();
    let token: string;

    it("login POST /api/auth", async () => {
        const loginResponse = await chai.request(server).post("/api/auth").send({
            email: "authExample@email.com",
            password: "pass1234"
        });

        token = loginResponse.body.token;
    })

    it("GET all users with jwt auth", async () => {
        const res = await chai.request(server).get("/api/users").set("x-access-token", token);

        console.log(res.body);
    })

    server.close();
})