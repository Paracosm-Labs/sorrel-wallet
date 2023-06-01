import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcomePage';
import Wallet from './pages/accountsPage';
import Earn from './pages/vaultsPage';
import Explore from './pages/explorePage';
import Addons from './pages/addonsPage';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/wallet" element={<Wallet />} />
        <Route exact path="/earn" element={<Earn />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/addons" element={<Addons />} />
        <Route element={<Welcome />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
