import app from "../src/app";
import { Application } from "express-serve-static-core";
import chai from "chai";

const { expect, assert } = chai;

describe("Testing server", () => {
    it("Startup", () => {
        const server: Application = app.createServer(8080);
    });

})