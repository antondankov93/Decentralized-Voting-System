// src/component/Voting.tsx
import { useEffect, useState } from "react";
import { useAccount, useContract, useProvider } from 'wagmi';
import { VotingContractABI } from '../contracts/VotingContractABI'; // Import your ABI

export const Voting = () => {
    const { address: account } = useAccount();
    const provider = useProvider();
    const [proposals, setProposals] = useState<any[]>([]);
    const contractAddress = "0xYourContractAddress"; // Replace with your contract address
    const contract = useContract({
        address: contractAddress,
        abi: VotingContractABI,
        signerOrProvider: provider,
    });

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const data = await contract.getProposals();
                setProposals(data);
            } catch (error) {
                console.error("Error fetching proposals:", error);
            }
        };

        fetchProposals();
    }, [contract]);

    const castVote = async (proposalIndex: number) => {
        try {
            const tx = await contract.vote(proposalIndex);
            await tx.wait();
            // Optionally update proposals state or show a success message
        } catch (error) {
            console.error("Error casting vote:", error);
        }
    };

    return (
        <div>
            {proposals.map((proposal, idx) => (
                <div key={idx}>
                    <p>{proposal.description}</p>
                    <button onClick={() => castVote(idx)} disabled={!account}>
                        Vote
                    </button>
                </div>
            ))}
        </div>
    );
};