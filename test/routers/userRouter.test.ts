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
        expect(res).to.have.status(200);
    });

    it("GET /users/id", async () => {
        const res = await chai.request(server).get("/api/users/5d6d3bf685459b27c456a40f");
        expect(res).to.have.status(200);
        expect(res.body).to.haveOwnProperty("email");
        expect(res.body).to.haveOwnProperty("password");
    });

    it("POST and DELETE /users", async () => {
        const postResponse = await chai.request(server).post("/api/users").send({
            email: "specials@email.com",
            password: "passwordsStronk"
        });

        expect(postResponse).to.have.status(201);
        expect(postResponse.body).to.haveOwnProperty("_id");
        expect(postResponse.body).to.haveOwnProperty("email");
        expect(postResponse.body).to.haveOwnProperty("password");

        const deleteResponse = await chai.request(server)
            .delete(`/api/users/${postResponse.body._id}`);

        expect(deleteResponse).to.have.status(204);
    });

    it("DELETE /users with a bad id", async () => {
        const res = await chai.request(server)
            .delete("/api/users/445454545");

        expect(res).to.have.status(404);
        expect(res.body).to.haveOwnProperty("error");
    });

    server.close();
})