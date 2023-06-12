import React, { useState } from 'react';
import TronWeb from 'tronweb';
import CryptoJS from 'crypto-js';
import crc from 'crc';

const CreateWallet = ({ onWalletCreation }) => {
  const [wallet, setWallet] = useState(null);
  const [pin, setPin] = useState(Array(6).fill(''));
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [offcanvasTitle, setOffcanvasTitle] = useState('');

  const handlePinChange = (digit, index) => {
    const newPin = [...pin];
    newPin[index] = digit;
    setPin(newPin);
    console.log(digit);
  };

  const handleOffcanvasClose = () => {
    setShowOffcanvas(false);
  };

  const handleOffcanvasSubmit = () => {
    const pinString = pin.join('');
    if (pinString.length !== 6) {
      alert('PIN must be 6 digits');
      return;
    }
    if (offcanvasTitle === 'Set PIN') {
      createWallet(pinString);
    } else if (offcanvasTitle === 'Check Private Key' && wallet) {
      checkPrivateKey(pinString);
    }
    setShowOffcanvas(false);
  };

  const createWallet = (pin) => {
    TronWeb.createAccount().then(newWallet => {
      // Encrypt the private key with the pin
      const cipher = CryptoJS.AES.encrypt(newWallet.privateKey, pin).toString();
      // Generate a CRC32 checksum of the cipher
      const checksum = crc.crc32(cipher).toString(16);
      // Create a new wallet object with the encrypted private key and checksum
      const secureWallet = {
        ...newWallet,
        privateKey: cipher,
        checksum: checksum
      };
      setWallet(secureWallet);
      onWalletCreation(secureWallet);
    });
  };

  const checkPrivateKey = (pin) => {
    const bytes = CryptoJS.AES.decrypt(wallet.privateKey, pin);
    const originalPrivateKey = bytes.toString(CryptoJS.enc.Utf8);
    alert(`Your private key is: ${originalPrivateKey}`);
  };

  const handleCreateWallet = () => {
    setOffcanvasTitle('Set PIN');
    setShowOffcanvas(true);
  };

  const handleCheckPrivateKey = () => {
    if (wallet) {
      setOffcanvasTitle('Check Private Key');
      setShowOffcanvas(true);
    } else {
      alert('Please create a wallet first.');
    }
  };
  const handleClearPin = () => {
    setPin(Array(6).fill(''));
  };

  return (
    <div className="">
      <button className="btn btn-outline-success m-2" onClick={handleCreateWallet}>Create Wallet</button>
      <button className="btn btn-outline-secondary m-2" onClick={handleCheckPrivateKey}>Check Private Key</button>
      
      <div className={`offcanvas pinpad offcanvas-bottom ${showOffcanvas ? 'show' : ''}`} tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasBottomLabel">{offcanvasTitle}</h5>
          <button type="button" className="btn-close btn-close-white text-reset" onClick={handleOffcanvasClose}></button>
        </div>
        <div className="offcanvas-body container">
          <div className="row">
            <div className="col d-none d-md-block d-sm-none"></div>
            <div className="col">
              <div className="d-flex justify-content-around">
                {pin.map((digit, index) => (
                  <div key={index} className="border border-secondary text-center text-white mx-2 p-4">
                    <p className="text-white">{digit ? '*' : ''}</p>
                  </div>
                ))}
              </div>
              <div className="row justify-content-between mt-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
                  <div className="col-4 mt-2">
                    <button key={digit} className="btn btn-outline-secondary btn-lg w-100" onClick={() => handlePinChange(digit)}>{digit}</button>
                  </div>
                ))}
                <div className="col-4 mt-2">
                  <button className="btn btn-outline-secondary btn-lg w-100" onClick={handleClearPin}>
                    <i className="fa-solid fa-delete-left"></i>
                  </button>
                </div>
              </div>
              
              <button className="btn btn-outline-success btn-lg w-100 mt-4" onClick={handleOffcanvasSubmit}>Submit</button>
            </div>
            <div className="col d-none d-md-block d-sm-none"></div>
          </div>
        </div>
      </div>

      {wallet && (
        <div className="text-white m-3">
          <small>Public Address: {wallet.address.base58}</small><br/>
          <small>Private Key: ******</small>
        </div>
      )}
    </div>
  );
};

export default CreateWallet;