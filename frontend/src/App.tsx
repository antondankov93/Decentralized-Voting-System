// src/App.tsx
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { Voting } from './component/Voting';

const { chains, provider } = configureChains(
    [mainnet],
    [publicProvider()]
);

const client = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'Voting App',
            },
        }),
    ],
    provider,
});

export default function App() {
    return (
        <WagmiConfig client={client}>
            <Voting />
        </WagmiConfig>
    );
}