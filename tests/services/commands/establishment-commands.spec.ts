import 'mocha';
import { expect } from 'chai';
import sinon from "sinon";
import testUtil from "../../test-util";

// import index.ts
import "../../../src/index";

// import commands
import EstablishCommands from "../../../src/services/commands/establishment/establishment-commands";

// import types
import { EstablishmentRequest } from "../../../src/types/establishment-types"

// Test variables
let sandbox: sinon.SinonSandbox;
let establishmentCommands: EstablishCommands;

// Global variables
let establishment: any;

describe('establishment-commands.spec.ts', () => {
    before(async () => {
      // initialize database
      await testUtil.initDatabase(true);
    });

    beforeEach(async () => {
      sandbox = sinon.createSandbox();

      establishmentCommands = new EstablishCommands();
    });

    afterEach(() => {
      sandbox.restore();
    })

    it('insert establishment should return insert id', async () => {
      let input: EstablishmentRequest = {
        name: "kelvin@simplino.com",
        coordinates: {
          lat: "41.40338",
          long: "2.17403"
        },
        time_per_person: "5",
        number_of_allowed: "5",
        type: "Tech"
      }
      establishment = await establishmentCommands.insertEstablishment(input);

      expect(establishment).to.be.not.null;
    });

    it('update establishment should update the establishment data', async () => {
      let input: EstablishmentRequest = {
        name: "luke@simplino.com",
        coordinates: {
          lat: "61.40338",
          long: "4.17403"
        },
        time_per_person: "10",
        number_of_allowed: "10",
        type: "Tech"
      }
      let updatedEstablishment: any = await establishmentCommands.updateEstablishment(input);

      expect(updatedEstablishment.name).to.be.equal("luke@simplino.com");
      expect(JSON.parse(JSON.stringify(updatedEstablishment.coordinates))).to.eqls({
        lat: "61.40338",
        long: "4.17403"
      });
      expect(updatedEstablishment.time_per_person).to.be.equal("10");
      expect(updatedEstablishment.number_of_allowed).to.be.equal("10");
      expect(updatedEstablishment.type).to.be.equal("Tech");
    });

    it('delete establishment should return at least 1 after insert', async () => {
      let input: EstablishmentRequest = {
        id: establishment._id
      }
      let deletedEstablishment = await establishmentCommands.deleteEstablishment(input);

      expect(deletedEstablishment.n).to.be.equal(1);
      expect(deletedEstablishment.nModified).to.be.equal(1);
      expect(deletedEstablishment.ok).to.be.equal(1);
    });
});