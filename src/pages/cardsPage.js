import React, { useState } from 'react';
import NFCCards from '../components/nfcReaderWriter';
import OffcanvasBuy from '../components/offcanvasBuy'; // Import the OffcanvasBuy component
import Navigation from '../components/navMenu';

const CardsPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleScanNFC = (data) => {
    setSelectedAddress(data);
  };

  // Shop details
  const shopId = 'sorrel';
  const shopName = 'Sorrel';
  const shopPic = 'logo2x.png'; // Replace with the actual logo URL

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
      <div className="m-1">
        <img src="/img/cards-mockup.jpg" className="w-100" />
      </div>
      <NFCCards
        publicAddress="sorrelAddress-0x"
        onRead={handleScanNFC}
      />
      <OffcanvasBuy
        shopId={shopId}
        shopName={shopName}
        shopPic={shopPic}
      />
    </div>
  );
};

export default CardsPage;
