import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NFCCards from './nfcReaderWriter';
import { WalletContext } from '../context/walletContext';

const OffcanvasNav = () => {
  const [selectedCountry, setSelectedCountry] = useState('1');
  const { isAuthenticated, user, logout, loginWithRedirect } =
    useAuth0();
  const walletContext = useContext(WalletContext);
  const navigate = useNavigate();

  const handleCountryChange = async (event) => {
    setSelectedCountry(event.target.value);
    console.log('Selected Country:', selectedCountry);
  };

  const handleLogout = async () => {
      walletContext.setWalletData(null);
      navigate(`/explore`);
      alert("Thank you for choosing Sorrel! See you Soon!")
  };

  // Function to handle NFC card login
  const handleNfcLogin = async (data) => {
    if (!walletContext.walletData) {
      if (data) {
        alert(`Hi! Welcome to Sorrel!`);
      }
    }

  };

  return (
    <div className="offcanvas navpane offcanvas-end" tabIndex="-1" id="offcanvasNav" aria-labelledby="offcanvasNavLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavLabel">Explore Sorrel</h5>
        <button type="button" className="btn-close  btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
      {isAuthenticated ? (


        <section className="mb-4 text-center">
          <div className="align-items-center">
            <img src={user.picture} alt="Avatar" className="rounded-circle m-3" height="60" />
            <h6 className="mb-0">{user.name}</h6>
            {walletContext.walletData ? (<>
                <small className="text-muted d-block" >{walletContext.walletData.address.base58}</small>
            </>):(``)}
            <p className="badge bg-success p-1 mt-3"><i className="fa-solid fa-wifi"></i>&nbsp;Connected</p>
          </div>
          <div className="mt-3">
            <label htmlFor="countrySelect" className="form-label">Switch Country</label>
            <select className="form-select form-control-lg" id="countrySelect" onChange={handleCountryChange}>
              <option defaultValue value="1">Trinidad & Tobago</option>
              <option value="2">Barbados</option>
              <option value="3">Jamaica</option>
              <option value="4">Dominica</option>
              <option value="Other Countries">other countries</option>
            </select>
          </div>
          <button onClick={handleLogout} className="btn btn-xs btn-outline-secondary mt-3" type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            Logout
          </button>
        </section> ):(

        <section className="mb-3 text-center">
        
        {walletContext.walletData ? (<>
          <div className="align-items-center">
            <small className="text-muted d-block" >{walletContext.walletData.address.base58}</small>
            <p className="badge bg-success p-2 mt-3"><i className="fa-solid fa-wifi"></i>&nbsp;Connected</p>
          </div>
          <button onClick={handleLogout} className="btn btn-xs btn-outline-secondary mt-3" type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            Logout
          </button>
        </>):(<>
          <div className="align-items-center">
            <p className="badge bg-info p-2"><i className="fa-solid fa-toggle-off"></i>&nbsp;Not Connected</p>
          </div>
          <button onClick={() => loginWithRedirect()} className="btn btn-xs btn-outline-secondary m-2 mt-3 mb-3 d-none" type="button">
            Login | Sign Up
          </button>
          <NFCCards  onNFCRead={handleNfcLogin} mode="alternative" />

        </>) }
        <hr/>
        
        </section>
        
        )

      }

        <section>
          <div className="row">
            <div className="col mt-2">
            
              <Link to="/addons" className="nav-link">
              <button className="btn btn lg btn-outline-primary w-100" type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <i className="fa-solid fa-lg fa-puzzle-piece mt-4"></i><p className="mt-2">Addons</p>
              </button>
              </Link>


            </div>

            <div className="col mt-2">
              <a href="https://discord.gg/kBtNQ9dtFV" rel="noreferrer" target="_blank">
                <button className="btn btn lg btn-outline-primary w-100" type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                  <i className="fa-solid fa-lg fa-satellite-dish mt-4"></i><p className="mt-2">Community</p>
                </button>
              </a>
            </div>

            <div className="col mt-2">
              <button className="btn btn lg btn-outline-primary disabled w-100 d-none" data-bs-dismiss="offcanvas" aria-label="Close">
                <i className="fa-solid fa-bell-concierge mt-4 fa-lg"></i><p className="">Concierge</p>
              </button>
            </div>
            <div className="col mt-2">
              <button className="btn btn lg btn-outline-primary disabled w-100 d-none" data-bs-dismiss="offcanvas" aria-label="Close">
                <i className="fa-solid fa-plus mt-4 fa-lg"></i><p className="">Sorrel Lounges</p>
              </button>
            </div>
            <div className="col mt-2">
              <button className="btn btn lg btn-outline-primary disabled w-100 d-none" data-bs-dismiss="offcanvas" aria-label="Close">
                <i className="fa-solid fa-plus mt-4 fa-lg"></i><p className="">Sorrel <br/>Pay</p>
              </button>
            </div>
            <div className="col mt-2">
              <button className="btn btn lg btn-outline-primary disabled w-100 d-none" data-bs-dismiss="offcanvas" aria-label="Close">
                <i className="fa-solid fa-plus mt-4 fa-lg"></i><p className="">Family Office</p>
              </button>
            </div>

          </div>
        </section>


        <div className="mt-5 text-center">
          <p className="text-muted">By Paracsom Labs</p>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasNav;
