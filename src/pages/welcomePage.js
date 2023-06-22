import React, { useContext } from 'react';
import { withAuth0, useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { WalletContext } from '../context/walletContext';
import CreateWalletBtn from '../components/createWallet';

const CountryPage = () => {
  const { user, isAuthenticated } = useAuth0();
  // const [selectedCountry, setSelectedCountry] = useState('1');
  const walletContext = useContext(WalletContext);
  const navigate = useNavigate();

  const goToWallet = async () => {
    alert("Hi! Welcome to Sorrel!");
    navigate("/cards");
  };

  const handleCountryChange = (event) => {
    localStorage.setItem('selectedCountry', event.target.value);
    console.log('Selected Country:', event.target.value);
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
            <h5>Your Sorrel Wallet Awaits!</h5>
            {!walletContext.walletData ? (
            <div className="p-1 mt-3">
              <h6 className="text-left">Select Your Home Country</h6>
              <select className="mt-3 form-select" aria-label="Select Country" onChange={handleCountryChange}>
                <option defaultValue value="1">Trinidad & Tobago</option>
                <option value="2">Barbados</option>
                <option value="3">Jamaica</option>
                <option value="4">Dominica</option>
                <option value="1001">Other Countries</option>
              </select>
            </div>
                ):(``)}          
            <div className="mt-4 p-1">
              
              {walletContext.walletData ? (
                  <button className={`btn btn-success btn-lg m-2 w-100 m-auto`} onClick={goToWallet}>Go To Wallet</button>
                ):(
                  <CreateWalletBtn view="createWalletUIButton"/>
                )}
              

            </div>
          </div>
        </div>

      
        
      </div>

      

    </>
  );
};

export default withAuth0(CountryPage);
