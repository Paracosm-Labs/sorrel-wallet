import React, { useState } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import LogoImg from '../img/logo2x.png';

const redirectToURL = (url) => {
  window.location.href = url;
};

const CountryPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('1');

  const createWallets = async () => {
    // Handle onchain wallet creation logic
    console.log('Your wallet is being created...');
    redirectToURL('/wallet');
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    console.log('Selected Country:', selectedCountry);
  };

  return (
    <>
      <div className="onboarding text-center welcome">
        <div className="carousel-inner">
          <img src="/img/onboard5.jpg" className="d-block mx-auto w-100" width="420" height="800" />
          <div className="carousel-caption">
            <h5>Your New Sorrel Account Awaits!</h5>
            <div className="p-1 mt-5">
              <h6 className="text-left">Select Your Home Country</h6>
              <select className="mt-3 form-select" aria-label="Select Country" onChange={handleCountryChange}>
                <option defaultValue value="1">Trinidad & Tobago</option>
                <option value="2">Barbados</option>
                <option value="3">Jamaica</option>
                <option value="4">Dominica</option>
                <option value="Other Countries">Other Countries</option>
              </select>
            </div>
            <button onClick={createWallets} className="btn btn-lg btn-outline-success w-100 mt-5 mb-3" type="button">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth0(CountryPage);