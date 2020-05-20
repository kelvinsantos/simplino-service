import 'mocha';
import { expect } from 'chai';
import sinon from "sinon";
import testUtil from "../../../tests/test-util";

// import index.ts
import "../../../src/index";

// import commands
import UserQueries from "../../../src/services/queries/user/user-queries";
import UserCommands from "../../../src/services/commands/user/user-commands";

// import types
import { UserRequest } from "../../../src/types/user/user-types"

// import utils
import AuthUtils from "../../../src/utils/auth-utils";

// Test variables
let sandbox: sinon.SinonSandbox;
let userQueries: UserQueries;
let userCommands: UserCommands;

// Global variables
let user: any;

describe('user-queries.spec.ts', () => { 
    beforeEach(async () => {
      sandbox = sinon.createSandbox();

      // initialize database
      await testUtil.initDatabase(true);

      userQueries = new UserQueries();
      userCommands = new UserCommands();

      let input: UserRequest = {
        email: "kelvin@simplino.com",
        first_name: "Kelvin",
        last_name: "Santos",
        mobile_number: "09061234567",
        password: await new AuthUtils().hashPassword("Mouse123")
      }
      user = await userCommands.insertUser(input);
    });

    afterEach(() => {
      sandbox.restore();
    })

    it('insert user should return insert id', async () => {
      let input: UserRequest = {
        id: user._id
      }
      let test = await userQueries.getUser(input);

      expect(test).to.be.not.null;
    });
});