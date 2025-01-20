pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string description;
        uint256 voteCount;
        uint256 endTime; // Add an endTime for each proposal
        bool executed; // Track if the proposal has been executed
    }

    Proposal[] public proposals;
    mapping(address => bool) public hasVoted;
    mapping(address => uint256) public voteWeight;
    address public owner; // Add an owner for the contract

    // Event emitted when a proposal is executed
    event ProposalExecuted(uint256 proposalIndex);

    constructor() {
        owner = msg.sender;
    }

    function createProposal(string memory _description, uint256 _duration) public {
        require(_duration > 0, "Duration must be greater than 0");
        uint256 endTime = block.timestamp + _duration;
        proposals.push(Proposal({
            description: _description,
            voteCount: 0,
            endTime: endTime,
            executed: false
        }));
    }

    function vote(uint256 _proposalIndex) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(_proposalIndex < proposals.length, "Invalid proposal");
        Proposal storage proposal = proposals[_proposalIndex];
        require(block.timestamp < proposal.endTime, "Voting period is over");

        uint256 weight = voteWeight[msg.sender];
        require(weight > 0, "No voting power");

        proposal.voteCount += weight;
        hasVoted[msg.sender] = true;
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    function setVoteWeight(address _voter, uint256 _weight) public {
        require(msg.sender == owner, "Only owner can set vote weight");
        voteWeight[_voter] = _weight;
    }

    // Allows the owner to execute a proposal after the voting period ends
    function executeProposal(uint256 _proposalIndex) public {
        require(msg.sender == owner, "Only owner can execute a proposal");
        Proposal storage proposal = proposals[_proposalIndex];
        require(block.timestamp >= proposal.endTime, "Voting period is not over");
        require(!proposal.executed, "Proposal already executed");

        proposal.executed = true;
        emit ProposalExecuted(_proposalIndex);

        // Add your logic here to execute the proposal, e.g.,
        // transfer funds, mint tokens, or call other contracts
    }
}