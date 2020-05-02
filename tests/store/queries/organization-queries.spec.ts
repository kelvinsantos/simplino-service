import 'mocha';
import { expect } from 'chai';
import sinon from "sinon";

// import queries
import OrganizationQueries from "../../../src/store/queries/organization/organization-queries";

// import types
import { OrganizationsRequest } from "../../../src/types/organizations"

// Test variables
let sandbox: sinon.SinonSandbox;
let organizationQuery: OrganizationQueries;

describe('organization-queries.spec.ts', () => { 
    beforeEach(() => {
      sandbox = sinon.createSandbox();

      organizationQuery = new OrganizationQueries();
      sinon.stub(organizationQuery, "getComments").resolves([]);
    });

    afterEach(() => {
      sandbox.restore();
    })

    it('get comments should return array of object', async () => {
      let input: OrganizationsRequest = {
        organization: "test-org"
      }
      let insertComment = await organizationQuery.getComments(input);

      expect(insertComment).to.be.not.null;
    });
});