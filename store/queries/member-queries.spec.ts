import 'mocha';
import { expect } from 'chai';
import sinon from "sinon";

// import queries
import MemberQueries from "../../../src/store/queries/organization/member-queries";

// import types
import { OrganizationsRequest } from "../../../src/types/organizations"

// Test variables
let sandbox: sinon.SinonSandbox;
let organizationQuery: MemberQueries;

describe('member-queries.spec.ts', () => { 
    beforeEach(() => {
      sandbox = sinon.createSandbox();

      organizationQuery = new MemberQueries();
      sinon.stub(organizationQuery, "getMembers").resolves();
    });

    afterEach(() => {
      sandbox.restore();
    })

    it('get members should return array of object', async () => {
      let input: OrganizationsRequest = {
        organization: "test-org"
      }
      let getMembers = await organizationQuery.getMembers(input);

      expect(getMembers).to.be.undefined;
    });
});