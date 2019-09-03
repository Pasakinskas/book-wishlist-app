import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import app from "../../src/app";
import chaiHttp from "chai-http";
import { Server } from "http";

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const { expect } = chai;

describe("Testing route", () => {
    const server: Server = app.createServer();

    it("POST /books", async () => {
        const res = await chai.request(server).post("/api/books").send({
            name: "20000 leagues under the sea",
            author: "Joules Verne",
            pages: 350
        })
        expect(res).to.have.status(201);
        expect(res.body).to.haveOwnProperty("name");
        expect(res.body).to.haveOwnProperty("author");
        expect(res.body).to.haveOwnProperty("pages");
    });

    server.close();
});