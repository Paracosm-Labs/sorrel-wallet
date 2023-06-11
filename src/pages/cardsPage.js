import React, {useState, useEffect } from 'react';
import NFCCards from '../components/nfcReaderWriter'
import Navigation from '../components/navMenu';
// import AccountBalance from '../components/accountBalance';
import OffcanvasTransfer from '../components/offcanvasTransfer';

const CardsPage = () => {
  
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const handleScanNFC = (data) => {
    setSelectedAddress(data);
  };

  return (
    <div className="text-center wallet-cards">
      <Navigation />
    <div className="info mb-5">
      <div className="card">
        <div className="card-body text-center mt-2">
            <h5>Get Your Sorrel Wallet Card Today!</h5>
        </div>
      </div>
    </div>

      <NFCCards
        publicAddress="sorrelAddress-0x"
        onRead={handleScanNFC} 
      />
      
    </div>
  );
};

export default CardsPage;
