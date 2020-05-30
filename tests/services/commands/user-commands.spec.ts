import 'mocha';
import { expect } from 'chai';
import sinon from "sinon";
import testUtil from "../../test-util";

// import index.ts
import "../../../src/index";

// import commands
import UserCommands from "../../../src/services/commands/user/user-commands";

// import types
import { UserRequest } from "../../../src/types/user-types"

// import utils
import AuthUtils from "../../../src/utils/auth-utils";

// Test variables
let sandbox: sinon.SinonSandbox;
let userCommands: UserCommands;

// Global variables
let user: any;

describe('user-commands.spec.ts', () => {
    before(async () => {
      // initialize database
      await testUtil.initDatabase(true);
    });

    beforeEach(async () => {
      sandbox = sinon.createSandbox();

      userCommands = new UserCommands();
      // sinon.stub(userCommands, "insertUser").resolves({});
      // sinon.stub(userCommands, "updateUser").resolves({
      //   "n": 1,
      //   "nModified": 1,
      //   "ok": 1
      // });
      // sinon.stub(userCommands, "deleteUser").resolves({
      //   "n": 1,
      //   "nModified": 1,
      //   "ok": 1
      // });
    });

    afterEach(() => {
      sandbox.restore();
    })

    it('insert user should return insert id', async () => {
      let input: UserRequest = {
        email: "kelvin@simplino.com",
        first_name: "Kelvin",
        last_name: "Santos",
        mobile_number: "09061234567",
        password: await new AuthUtils().hashPassword("Mouse123")
      }
      user = await userCommands.insertUser(input);

      expect(user).to.be.not.null;
    });

    it('update user should update the user data', async () => {
      let input: UserRequest = {
        first_name: "Luke",
        last_name: "Skywalker"
      }
      let updatedUser: any = await userCommands.updateUser(input);

      expect(updatedUser.first_name).to.be.equal("Luke");
      expect(updatedUser.last_name).to.be.equal("Skywalker");
    });

    it('delete user should return at least 1 after insert', async () => {
      let input: UserRequest = {
        id: user._id
      }
      let deletedUser = await userCommands.deleteUser(input);

      expect(deletedUser.n).to.be.equal(1);
      expect(deletedUser.nModified).to.be.equal(1);
      expect(deletedUser.ok).to.be.equal(1);
    });
});