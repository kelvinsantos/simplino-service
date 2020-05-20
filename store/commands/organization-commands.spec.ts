import 'mocha';
import { expect } from 'chai';
import sinon from "sinon";

// import commands
import OrganizationCommands from "../../../src/store/commands/organization/organization-commands";

// import types
import { OrganizationsRequest } from "../../../src/types/organizations"
import { CommentsRequest } from "../../../src/types/comments"

// Test variables
let sandbox: sinon.SinonSandbox;
let organizationCommand: OrganizationCommands;

describe('organization-commands.spec.ts', () => { 
    beforeEach(() => {
      sandbox = sinon.createSandbox();

      organizationCommand = new OrganizationCommands();
      sinon.stub(organizationCommand, "insertComment").resolves({});
      sinon.stub(organizationCommand, "deleteComment").resolves({
        "n": 1,
        "nModified": 1,
        "ok": 1
      });
    });

    afterEach(() => {
      sandbox.restore();
    })

    it('insert comment should return insert id', async () => {
      let input: CommentsRequest = {
        organization: "test-org",
        comment: "test-comment"
      }
      let insertComment = await organizationCommand.insertComment(input);

      expect(insertComment).to.be.not.null;
    });

    it('delete comment should return at least 1 after insert', async () => { 
      let input: OrganizationsRequest = {
        organization: "test-org"
      }
      let deleteComment = await organizationCommand.deleteComment(input);

      expect(deleteComment.n).to.be.equal(1);
      expect(deleteComment.nModified).to.be.equal(1);
      expect(deleteComment.ok).to.be.equal(1);
    });
});