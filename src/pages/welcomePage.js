import React, { useState, useContext } from 'react';
import { withAuth0, useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { WalletContext } from '../context/walletContext';
import PinPad from '../components/offcanvasPinpad';


const CountryPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [pin, setPin] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('1');
  const [showPinPad, setShowPinPad] = useState(false);
  const walletContext = useContext(WalletContext);
  const navigate = useNavigate();

  const handleCreateWallet = async () => {
  // Store the selected country in the local storage
    localStorage.setItem('selectedCountry', selectedCountry);
    console.log('Your wallet is being created...');
    setShowPinPad(true);
  };

  const createWallet = async () => {
    //TODO
    alert(selectedCountry);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    console.log('Selected Country:', event);
  };

  return (
    <>
      <div className="onboarding text-center welcome">
        <div className="carousel-inner">
          <img src="/img/onboard5.jpg" alt="Sorrel Onboarding" className="d-block mx-auto w-100" width="420" height="800" />
          <div className="carousel-caption">
          {isAuthenticated ? (
	         <div className="align-items-center">
	            <img src={user.picture} alt="Avatar" className="rounded-circle m-3" height="52" />
	            <h6 className="mb-0">{user.name}</h6>
	            <p className="badge bg-success p-1"><i className="fa-solid fa-wifi"></i>&nbsp;Connected</p>
	          </div> ):(<></>)}
            <h5>Your Sorrel Account Awaits!</h5>
            <div className="p-1 mt-5">
              <h6 className="text-left">Select Your Home Country</h6>
              <select className="mt-3 form-select" aria-label="Select Country" onChange={handleCountryChange}>
                <option defaultValue value="1">Trinidad & Tobago</option>
                <option value="2">Barbados</option>
                <option value="3">Jamaica</option>
                <option value="4">Dominica</option>
                <option value="1001">Other Countries</option>
              </select>
            </div>
            <button onClick={handleCreateWallet} className="btn btn-lg btn-outline-success w-100 mt-5 mb-3" type="button">
              Create Account
            </button>
          </div>
        </div>

      

          <PinPad
            showOffcanvas={showPinPad}
            setShowOffcanvas={setShowPinPad}
            offcanvasTitle="Enter New PIN"
            pin={pin}
            setPin={setPin}
            handleOffcanvasSubmit={createWallet}
          />
        
      </div>

      

    </>
  );
};

export default withAuth0(CountryPage);
