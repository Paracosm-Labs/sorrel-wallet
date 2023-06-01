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
        <Route exact path="/" element={<WelcomePage/>} />
        <Route exact path="/wallet" element={<AccountsPage/>} />
        <Route exact path="/earn" element={<EarnPage/>} />
        <Route exact path="/explore" element={<ExplorePage/>} />
        <Route exact path="/addons" element={<AddonsPage/>} />
      </Routes>

    </Router>
  );
};

export default App;
