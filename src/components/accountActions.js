import React, { useState, useContext } from 'react';
import ModalQRCode from './modalQRCode';
import OffcanvasDeposit from './offcanvasDeposit';
import OffcanvasTransfer from './offcanvasTransfer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WalletContext } from '../context/walletContext';

const AccountActions = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const walletContext = useContext(WalletContext);


  const deposit = async (amount) => {
    // Call the contract's deposit function
    // await bank.deposit(amount);
  };

  const withdraw = async (gStableId, amount) => {
    // Call the contract's withdraw function
    // await bank.withdraw(gStableId, amount);
  };

  const moveGL = async (toAddress, gStableId, amount) => {
    // Call the contract's moveGL function
    // await bank.moveGL(walletContext.walletData.base58, toAddress, gStableId, amount);
  };

  const handleQRCodeClick = () => {
    setShowQRCode(true);
  };

  const offcanvasExchange = () => {
    toast.info("Welcome to Sorrel! I'm Jes, Your Concierge. What would you like to do today?", {
      icon: ({theme, type}) =>  <img src="/img/jes.jpg" alt="Jes Concierge" className="rounded-circle" height="24"/>,
      theme: "dark",
    });

  };

  const handleShareQRCode = () => {
    // Handle sharing the QR code logic
    console.log('QR code shared');
  };

  return (
    <div>
      <div className="mt-3 d-flex justify-content-around">
        <button className="btn btn-lg btn-outline-secondary" type="button" onClick={() => deposit(100)} data-bs-toggle="offcanvas" data-bs-target="#offcanvasDeposit" aria-controls="offcanvasExchange">
          <i className="fa-solid fa-cloud-arrow-up"></i>&nbsp;
          Add
        </button>

        <button className="btn btn-lg btn-outline-secondary" type="button" onClick={handleQRCodeClick}>
          <i className="fa-solid fa-qrcode"></i>
        </button>
        <button className="btn btn-lg btn-outline-secondary" type="button" onClick={offcanvasExchange}>
          <i className="fa-solid fa-bell-concierge"></i>
        </button>

        <button className="btn btn-lg btn-outline-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTransfer" aria-controls="offcanvasTransfer">
          <i className="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;
          Send
        </button>
      </div>


      <ModalQRCode 
        showQRCode={showQRCode}
        onClose={() => setShowQRCode(false)}
        onShare={handleShareQRCode}
      />
      
      <OffcanvasDeposit />
      <OffcanvasTransfer />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />  

    </div>
  );
};

export default AccountActions;
