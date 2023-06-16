import React, { useState, useContext } from 'react';
import OffcanvasBuy from '../components/offcanvasBuy'; // Import the OffcanvasBuy component
import Navigation from '../components/navMenu';
import CreateWallet from '../components/createWallet';
import AccountBalance from '../components/accountBalance';
import { WalletContext } from '../context/walletContext';

const CardsPage = () => {
  const walletContext = useContext(WalletContext);

  // Shop details
  const shopId = 'sorrel';
  const shopName = 'Sorrel Store';
  const shopPic = 'logo2x.png';

  return (
    <div className="text-center wallet-cards">
      <Navigation />
      {walletContext.walletData ? (
      <AccountBalance />
      ) : (<>

      <div className="info mb-5">
        <div className="card">
          <div className="card-body text-center mt-2">
            
            <h5>Get Your Wallet NFC Card Today!</h5>
            <button
              className="btn btn-outline-success w-50  mt-3 btn-lg"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasBuy"
              aria-controls="offcanvasBuy"
            >
              Order Card
            </button>
            
          </div>
        </div>
      </div>
      </>)}

      <div className="m-1 text-white">
      <div className="content pb-3">
      
        <img src="/img/cards-mockup.jpg" alt="Sorrel Wallet NFC Cards" className="w-100 mb-2" />
       <CreateWallet /> 
       

      {!walletContext.walletData && (<>
        <div className="text-start m-3">
        <h4 className="mt-5">Benefits</h4>
        <p><i className="fa-solid fa-circle-check text-success"></i>&nbsp;&nbsp;Stores your private keys encrypted & offline</p>
        <p><i className="fa-solid fa-circle-check text-success"></i>&nbsp;&nbsp;Payments made simple with just a tap & PIN</p>
        <p><i className="fa-solid fa-circle-check text-success"></i>&nbsp;&nbsp;Upgradable via p2p cloud or internet</p>
        <p><i className="fa-solid fa-circle-check text-success"></i>&nbsp;&nbsp;Re/Upcyclable with no expiry date</p>
        <p><i className="fa-solid fa-circle-check text-success"></i>&nbsp;&nbsp;Simple Activation Process</p>
        </div>

      </>)}
      </div>

      </div>
      <OffcanvasBuy
        shopId={shopId}
        shopName={shopName}
        shopPic={shopPic}
      />
    </div>
  );
};

export default CardsPage;