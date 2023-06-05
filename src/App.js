import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './pages/introPage';
import Welcome from './pages/welcomePage';
import Wallet from './pages/walletPage';
import Earn from './pages/earnPage';
import Explore from './pages/explorePage';
import Addons from './pages/addonsPage';

const App = () => {

    return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Intro />} />
        <Route exact path="/welcome" element={<Welcome />} />
        <Route exact path="/wallet" element={<Wallet />} />
        <Route exact path="/earn" element={<Earn />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/addons" element={<Addons />} />
        <Route element={<Wallet />} />
      </Routes>
    </BrowserRouter>

  );

    
};



export default App;
