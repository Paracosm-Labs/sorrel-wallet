import React from 'react';
import { Link } from 'react-router-dom';
import OffcanvasNav from './offcanvasNav';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import DappLogo from "../img/sorrel-logo.png";

const NavMenu = () => {
  return (
    <>
    <div className="d-flex bg-sorrel-nav">
    <div className="container justify-content-center py-1">
      <Navbar bg="" className="navbar-dark">
        <Navbar.Brand href="/">
          <img src={DappLogo}
            height="48"
            alt="Sorrel Banq"
          />
        </Navbar.Brand>


          <Nav className="m-auto text-center">
            <NavItem className="px-3">
              <Link to="/wallet" className="nav-link"><i className="fa-solid fa-wallet"></i><br/>Wallet</Link>
            </NavItem>
            <NavItem className="px-3">
              <Link to="/earn" className="nav-link"><i className="fa-solid fa-vault"></i><br/>Earn</Link>
            </NavItem>
            <NavItem className="px-3">
              <Link to="/explore" className="nav-link"><i className="fa-solid fa-store"></i><br/>Explore</Link>
            </NavItem>
          </Nav>
          <Nav className="ml-auto">

              <button className="btn btn lg btn-outline" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav" aria-controls="offcanvasNav">
                <span className="navbar-toggler-icon"></span>
              </button>

            <NavItem>
              
            </NavItem>
          </Nav>
      </Navbar>


    </div>
    <OffcanvasNav></OffcanvasNav>
    </div>
    </>
  );
};

export default NavMenu;