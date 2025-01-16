import { WagmiConfig, createClient, configureChains, useAccount } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { Ethereum } from '@wagmi/chains';

const client = createClient({
    autoConnect: true,
    connectors: [/* Add your wallet connectors */],
    provider: publicProvider(),
});

export default function App() {
    return (
        <WagmiConfig client={client}>
            <YourComponent />
        </WagmiConfig>
    );
}