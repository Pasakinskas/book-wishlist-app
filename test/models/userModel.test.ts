import chai from "chai";
import { UserModel } from "../../src/models/userModel";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

const { expect } = chai;

describe("Testing user model", () => {
    it("creating a correct model", async () => {
        const user = new UserModel({email: "bestemailever@email.com", password: "password123"});
        await user.validate();
    });

    it("providing no email address when creating a model fails validation", async () => {
        const user = new UserModel({
            email: undefined,
            password: "securePass123"
        });

        await expect(user.validate()).to.be.rejected;

    });
})
