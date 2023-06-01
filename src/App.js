// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Welcome from './pages/welcomePage';
import Wallet from './pages/accountsPage';
import Earn from './pages/vaultsPage';
import Explore from './pages/explorePage';
import Addons from './pages/addonsPage';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path = "/" element={<Welcome/>} />
        <Route path = "wallet" element={<Wallet/>} />
        <Route path = "earn" element={<Earn/>} />
        <Route path = "explore" element={<Explore/>} />
        <Route path = "addons" element={<Addons/>} />
        <Route path = "*" element={<Welcome/>} />
      </Routes>

    </Router>
    </>
  );
};

export default App;
