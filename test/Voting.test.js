const { expect } = require("chai");

describe("Voting Contract", function () {
    it("Should create proposals and allow voting", async function () {
        const Voting = await ethers.getContractFactory("Voting");
        const voting = await Voting.deploy();
        await voting.deployed();

        await voting.createProposal("Proposal 1");
        await voting.createProposal("Proposal 2");

        await voting.vote(0);
        const proposals = await voting.getProposals();

        expect(proposals[0].voteCount).to.equal(1);
    });
});