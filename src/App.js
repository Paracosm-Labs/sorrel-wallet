import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './pages/introPage';
import Welcome from './pages/welcomePage';
import Wallet from './pages/walletPage';
import Earn from './pages/earnPage';
import Explore from './pages/explorePage';
import Shop from './pages/shopPage';
import Addons from './pages/addonsPage';
import Contract from './components/contractInterface';
import WalletCards from './pages/cardsPage';
import { WalletProvider } from './context/walletContext';
import TronWebContextProvider from './context/tronWebContext';
import { OrbitDBProvider } from './context/orbitdbContext';



const App = () => {

     return (
    <OrbitDBProvider>
    <TronWebContextProvider>
    <WalletProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Intro />} />
        <Route exact path="/welcome" element={<Welcome />} />
        <Route exact path="/wallet" element={<Wallet />} />
        <Route exact path="/earn" element={<Earn />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/addons" element={<Addons />} />
        <Route exact path="/contract" element={<Contract />} />
        <Route exact path="/cards" element={<WalletCards />} />
        <Route element={<Wallet />} />
      </Routes>
    </BrowserRouter>
    </WalletProvider>
    </TronWebContextProvider>
    </OrbitDBProvider>

  );

    
};



export default App;
