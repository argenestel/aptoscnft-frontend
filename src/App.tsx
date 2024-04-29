import './App.css'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { PetraWallet } from 'petra-plugin-wallet-adapter'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
    const wallets = [new PetraWallet()]
    return (
        <AptosWalletAdapterProvider
            plugins={wallets}
            autoConnect={true}
            onError={(error) => {
                console.log('error', error)
            }}
        >
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </AptosWalletAdapterProvider>
    )
}
export default App
