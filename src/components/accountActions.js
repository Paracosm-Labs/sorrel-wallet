import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import OffcanvasDeposit from './offcanvasDeposit';
import OffcanvasTransfer from './offcanvasTransfer';

const AccountActions = () => {
  const [balance, setBalance] = useState(0);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    // Fetch user's gStableId 1 balance from the contract
    const fetchBalance = async () => {
      // Call the contract's function to retrieve the balance
      // Replace `contractMethod()` with the actual method from the contract ABI
      // const userBalance = await bank.gStableBalanceMap(gStableId, address);

      // Update the balance state
      setBalance(3000.00);
    };

    // Call the fetchBalance function
    fetchBalance();
  }, []);

  const deposit = async (amount) => {
    // Call the contract's deposit function
    // Replace `contractMethod()` with the actual method from the contract ABI
    // await bank.deposit(amount);

    // Update the balance state
    setBalance(balance + amount);
  };

  const withdraw = async (gStableId, amount) => {
    // Call the contract's withdraw function
    // Replace `contractMethod()` with the actual method from the contract ABI
    // await bank.withdraw(gStableId, amount);

    // Update the balance state
    setBalance(balance - amount);
  };

  const moveGL = async (fromAddress, toAddress, gStableId, amount) => {
    // Call the contract's moveGL function
    // Replace `contractMethod()` with the actual method from the contract ABI
    // await bank.moveGL(fromAddress, toAddress, gStableId, amount);

    // Update the balance state
    setBalance(balance - amount);
  };

  const handleQRCodeClick = () => {
    setShowQRCode(true);
  };

  const handleShareQRCode = () => {
    // Handle sharing the QR code logic
    console.log('QR code shared');
  };

  return (
    <div>
      <div className="mt-3 d-flex justify-content-around">
        <button className="btn btn-lg btn-outline-secondary" type="button" onClick={() => deposit(100)} data-bs-toggle="offcanvas" data-bs-target="#offcanvasDeposit" aria-controls="offcanvasExchange">
          <i className="fa-solid fa-cloud-arrow-down"></i>&nbsp;
          Deposit
        </button>

        <button className="btn btn-lg btn-outline-secondary" type="button" onClick={handleQRCodeClick}>
          <i className="fa-solid fa-qrcode"></i>
        </button>

        <button className="btn btn-lg btn-outline-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTransfer" aria-controls="offcanvasTransfer">
          <i className="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;
          Transfer
        </button>
      </div>

      {showQRCode && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-fullscreen-sm-down">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">My Sorrel Wallet</h5>
                <button type="button" className="btn-close" onClick={() => setShowQRCode(false)}></button>
              </div>
              <div className="modal-body">
                <div className="text-center">
                  <QRCode value="Wallet Address!" />
                </div>
              </div>
              <div className="modal-footer m-auto">
                <button className="btn btn-lg btn-outline-secondary" type="button" onClick={handleShareQRCode}>
                  <i className="fa-solid fa-share"></i>&nbsp;
                  Share QR Code
                </button>

                <button type="button" className="btn btn-lg btn-secondary" onClick={() => setShowQRCode(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <OffcanvasDeposit />
      <OffcanvasTransfer />
    </div>
  );
};

export default AccountActions;
