import React, { useState } from 'react';
import NFCCards from '../components/nfcReaderWriter';
import OffcanvasBuy from '../components/offcanvasBuy'; // Import the OffcanvasBuy component
import Navigation from '../components/navMenu';
import CreateWallet from '../components/createWallet';

const CardsPage = () => {
  const [wallet, setWallet] = useState(null);

  const handleWalletCreation = (newWallet) => {
    setWallet(newWallet);
  };


  // Shop details
  const shopId = 'sorrel';
  const shopName = 'Sorrel Store';
  const shopPic = 'logo2x.png';

  return (
    <div className="text-center wallet-cards">
      <Navigation />
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
      <div className="m-1 text-white">
        <img src="/img/cards-mockup.jpg" alt="Sorrel Wallet NFC Cards" className="w-100" />
        <h4>Benefits</h4>
        <p>Keeps your private keys safely on NFC Chip</p>
        <p>Payments made easily with just a tap</p>
        <p>Exciting expansion possiblities</p>
      </div>
      <CreateWallet onWalletCreation={setWallet} />
      {wallet && <NFCCards
        publicAddress={wallet.address.base58}
        privateKey={wallet.privateKey}
        dummyProp1="Dummy Data 1"
        dummyProp2="Dummy Data 2"
        dummyProp3="Dummy Data 3"
      />}

      <OffcanvasBuy
        shopId={shopId}
        shopName={shopName}
        shopPic={shopPic}
      />
    </div>
  );
};

export default CardsPage;
