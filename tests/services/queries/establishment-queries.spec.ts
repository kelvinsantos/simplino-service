import 'mocha';
import { expect } from 'chai';
import sinon from "sinon";
import testUtil from "../../test-util";

// import index.ts
import "../../../src/index";

// import commands
import EstablishmentQueries from "../../../src/services/queries/establishment/establishment-queries";
import EstablishmentCommands from "../../../src/services/commands/establishment/establishment-commands";

// import types
import { EstablishmentRequest } from "../../../src/types/establishment-types"

// import utils
import AuthUtils from "../../../src/utils/auth-utils";

// Test variables
let sandbox: sinon.SinonSandbox;
let establishmentQueries: EstablishmentQueries;
let establishmentCommands: EstablishmentCommands;

// Global variables
let establishment: any;

describe('establishment-queries.spec.ts', () => { 
    beforeEach(async () => {
      sandbox = sinon.createSandbox();

      // initialize database
      await testUtil.initDatabase(true);

      establishmentQueries = new EstablishmentQueries();
      establishmentCommands = new EstablishmentCommands();

      let input: EstablishmentRequest = {
        "name": "Simplino Tech",
        "coordinates": {
          "lat": "41.40338",
          "long": "2.17403"
        },
          "time_per_person": "5",
          "number_of_allowed": "5",
          "type": "Tech"
      }
      establishment = await establishmentCommands.insertEstablishment(input);
    });

    afterEach(() => {
      sandbox.restore();
    })

    // it('insert establishment should return insert id', async () => {
    //   let input: EstablishmentRequest = {
    //     id: establishment
    //   }
    //   let establishmentFound = await establishmentQueries.getEstablishment(input);

    //   expect(establishmentFound).to.be.not.null;
    // });
});