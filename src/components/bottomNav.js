import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

const BottomNav = () => {
  return (
    <nav className="">
    <div className="row bottom-nav">
    <div className="col d-none d-md-block d-sm-none"></div>
    <div className="col nav-options d-flex">

              <button className="btn btn lg btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTransfer" aria-controls="offcanvasTransfer">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;
                Transfer
              </button>
              <button className="btn btn lg btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTransfer" aria-controls="offcanvasTransfer">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;
                Transfer
              </button>
    </div>
    <div className="col d-none d-md-block d-sm-none"></div>
    </div>
    </nav>
  );
};

export default BottomNav;
