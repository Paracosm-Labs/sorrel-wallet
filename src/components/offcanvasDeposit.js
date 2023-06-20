import React, { useState } from 'react';
import Dialpad from './dialpad';
import ModalQRCode from './modalQRCode';

const OffcanvasDeposit = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [depositDetails, setDepositDetails] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
  };

  const handleDepositDetailsChange = (event) => {
    setDepositDetails(event.target.value);
  };

  const handleConfirmDeposit = () => {
    // Handle transfer logic
    console.log('Deposit confirmed');
  };

  const handleQRCodeClick = () => {
    setShowQRCode(true);
  };

  const handleShareQRCode = () => {
    // Handle sharing the QR code logic
    console.log('QR code shared');
  };


  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasDeposit" aria-labelledby="offcanvasDepositLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDepositLabel">Deposit Funds</h5>
        <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
      <h6 className="text-center mt-3">How would you like to deposit to<br/> Your Sorrel account?</h6>
          <div className="row">
            <div className="col-12 mt-2">
              <a href="#">
              <button className="btn btn lg btn-outline-primary w-100 disabled d-none" type="button">
                <i className="fa-solid fa-lg fa-wallet mt-4"></i><p className="">TronLink</p>
              </button>
              </a>
            </div>
            <div className="col-12 mt-2">
              
              <button onClick={handleQRCodeClick} className="btn btn lg btn-outline-primary w-100" type="button">
                <i className="fa-solid fa-lg fa-qrcode mt-4"></i><p className="">Payment Request</p>
              </button>
              
            </div>
            <div className="col-12 mt-2">
              
              <button onClick={handleQRCodeClick} className="btn btn lg btn-outline-primary w-100" type="button">
                <i className="fa-solid fa-lg fa-qrcode mt-4"></i><p className="">QR Code</p>
              </button>
              
            </div>
            <div className="col-12 mt-2">
            <a href="#">
              <button className="btn btn lg btn-outline-primary w-100">
                <i className="fa-solid fa-sun mt-4 fa-lg"></i><p className=""> Exchanges</p>
                <small className="text-center text-info">3 Sources Available</small>
              </button>
            </a>
            </div>
            <div className="col-12 mt-2">
            <a href="#">
              <button className="btn btn lg btn-outline-primary w-100">
                <i className="fa-solid fa-users-gear mt-4 fa-lg"></i><p className="">P2P Options Near Me</p>
                <small className="text-center text-info">8 Sources Available</small>
              </button>
            </a>
            </div>
            <div className="col-12 mt-2">
            <a href="#">
              <button className="btn btn lg btn-outline-primary w-100">
                <i className="fa-solid fa-bell-concierge mt-4 fa-lg"></i><p className="">Ask Concierge Services</p>
              </button>
            </a>
            </div>
          </div>
      </div>

      <ModalQRCode
        showQRCode={showQRCode}
        onClose={() => setShowQRCode(false)}
        onShare={handleShareQRCode}
      />

    </div>
  );
};

export default OffcanvasDeposit;
