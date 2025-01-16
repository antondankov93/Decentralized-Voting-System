import { useEffect, useState } from "react";

export const Voting = () => {
    const { data: account } = useAccount();
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        // Fetch proposals from contract
    }, []);

    const castVote = async (proposalIndex: number) => {
        // Call vote function in smart contract
    };

    return (
        <div>
            {proposals.map((proposal, idx) => (
                <div key={idx}>
                    <p>{proposal.description}</p>
                    <button onClick={() => castVote(idx)}>Vote</button>
                </div>
            ))}
        </div>
    );
};