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
let queueCommands: QueueCommands;

// Global variables
let user: any;
let establishment: any;
let queue: any;

describe('queue-commands.spec.ts', () => {
    before(async () => {
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
    });
    
    beforeEach(async () => {
      sandbox = sinon.createSandbox();

      queueCommands = new QueueCommands();
    });

    afterEach(() => {
      sandbox.restore();
    })

    it('insert queue should return insert id', async () => {
      let input: QueueRequest = {
        user: user._id,
        establishment: establishment._id,
        position_in_queue: "1",
        waiting_time: "5",
        coordinates: {
          lat: "41.40338",
          long: "2.17403"
        },
        status: "pending"
      }
      queue = await queueCommands.insertQueue(input);

      expect(queue).to.be.not.null;
    });

    it('update queue should update the queue data', async () => {
      let input: QueueRequest = {
        "status": "arrived"
      }
      let updatedQueue: any = await queueCommands.updateQueue(input);

      expect(updatedQueue.status).to.be.equal("arrived");
    });

    it('delete queue should return at least 1 after insert', async () => {
      let input: QueueRequest = {
        id: queue._id
      }
      let deletedQueue = await queueCommands.deleteQueue(input);

      expect(deletedQueue.n).to.be.equal(1);
      expect(deletedQueue.nModified).to.be.equal(1);
      expect(deletedQueue.ok).to.be.equal(1);
    });
});