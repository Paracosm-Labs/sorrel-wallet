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
import NFCReaderWriter from './components/nfcReaderWriter';

const App = () => {

    return (
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
        <Route exact path="/nfc" element={<NFCReaderWriter />} />
        <Route element={<Wallet />} />
      </Routes>
    </BrowserRouter>

  );

    
};



export default App;
