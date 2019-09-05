import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";
import { Server } from "http";

import { createServer } from "../../src/app";
import { UserModel } from "../../src/models/userModel";
import { TestUtils } from "../testUtils";

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const { expect } = chai;

describe("Testing route", () => {
    let server: Server;
    let userId: string;

    before(async () => {
        server = createServer();
        const testUtils = new TestUtils();
        await testUtils.mockDataForTesting();

        const user = await UserModel.findOne({email: 'testUser1@email.com'});
        if (user) {
            userId = user._id;
        }
    });

    after(() => {
        server.close();
    });

    it("GET /users/id", async () => {
        const res = await chai.request(server).get(`/api/users/${userId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.haveOwnProperty("email");
        expect(res.body).to.haveOwnProperty("password");
    });

    it("POST and DELETE /users", async () => {
        const postResponse = await chai.request(server).post("/api/users").send({
            email: "turingTesting@email.com",
            password: "alanTuring"
        });

        expect(postResponse).to.have.status(201);

        const deleteResponse = await chai.request(server)
            .delete(`/api/users/${postResponse.body.id}`);

        expect(deleteResponse).to.have.status(204);
    });

    it("DELETE /users with a bad id", async () => {
        const res = await chai.request(server)
            .delete("/api/users/445454545");

        expect(res).to.have.status(404);
        expect(res.body).to.haveOwnProperty("error");
    });
})