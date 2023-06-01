// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './pages/welcomePage';
import AccountsPage from './pages/accountsPage';
import EarnPage from './pages/vaultsPage';
import ExplorePage from './pages/explorePage';
import AddonsPage from './pages/addonsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/wallet" element={<AccountsPage/>} />
        <Route path="/earn" element={<EarnPage/>} />
        <Route path="/explore" element={<ExplorePage/>} />
        <Route path="/addons" element={<AddonsPage/>} />
        <Route path = "*" element={<WelcomePage/>} />
      </Routes>

    </Router>
  );
};

export default App;
