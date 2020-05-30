import 'mocha';
import { expect } from 'chai';
import sinon from "sinon";
import testUtil from "../../test-util";

// import index.ts
import "../../../src/index";

// import commands
import UserCommands from "../../../src/services/commands/user/user-commands";
import EstablishCommands from "../../../src/services/commands/establishment/establishment-commands";
import QueueCommands from "../../../src/services/commands/queue/queue-commands";

// import queues
import QueueQueries from "../../../src/services/queries/queue/queue-queries";

// import types
import { UserRequest } from "../../../src/types/user-types"
import { EstablishmentRequest } from "../../../src/types/establishment-types"
import { QueueRequest } from "../../../src/types/queue-types"

// import utils
import AuthUtils from "../../../src/utils/auth-utils";

// Test variables
let sandbox: sinon.SinonSandbox;
let userCommands: UserCommands;
let establishmentCommands: EstablishCommands;
let queueQueries: QueueQueries;
let queueCommands: QueueCommands;

// Global variables
let user: any;
let establishment: any;
let queue: any;

describe('queue-queries.spec.ts', () => { 
    beforeEach(async () => {
      sandbox = sinon.createSandbox();

      // initialize database
      await testUtil.initDatabase(true);

      userCommands = new UserCommands();
      let inputUser: UserRequest = {
        email: "kelvin@simplino.com",
        first_name: "Kelvin",
        last_name: "Santos",
        mobile_number: "09061234567",
        password: await new AuthUtils().hashPassword("Mouse123")
      }
      user = await userCommands.insertUser(inputUser);

      establishmentCommands = new EstablishCommands();
      let inputEstablishment: EstablishmentRequest = {
        name: "kelvin@simplino.com",
        coordinates: {
          lat: "41.40338",
          long: "2.17403"
        },
        time_per_person: "5",
        number_of_allowed: "5",
        type: "Tech"
      }
      establishment = await establishmentCommands.insertEstablishment(inputEstablishment);

      queueCommands = new QueueCommands();
      let input: QueueRequest = {
        user: user,
        establishment: establishment,
        position_in_queue: "1",
        waiting_time: "5",
        coordinates: {
          lat: "41.40338",
          long: "2.17403"
        },
        status: "pending"
      }
      queue = await queueCommands.insertQueue(input);

      queueQueries = new QueueQueries();
    });

    afterEach(() => {
      sandbox.restore();
    })

    // it('insert queue should return insert id', async () => {
    //   let input: QueueRequest = {
    //     id: queue
    //   }
    //   console.log("input::", input);
    //   let establishmentFound = await queueQueries.getQueue(input);

    //   expect(establishmentFound).to.be.not.null;
    // });
});