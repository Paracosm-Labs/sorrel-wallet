import React, { useState } from 'react';
import TronWeb from 'tronweb';
import CryptoJS from 'crypto-js';
import crc from 'crc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';
import BarLoader from "react-spinners/BarLoader";

const CreateWallet = ({ onWalletCreation }) => {
  const [wallet, setWallet] = useState(null);
  const [pin, setPin] = useState('');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [offcanvasTitle, setOffcanvasTitle] = useState('');

  const handlePinChange = (digit) => {
    if (pin.length < 6) {
      setPin(pin + digit);
    }
  };

  const handleNFCRead = (data) => {
    setWallet(data);
  };

  const handleOffcanvasClose = () => {
    setShowOffcanvas(false);
    setPin('');
  };


const handleOffcanvasSubmit = () => {
  if (pin.length !== 6) {
        toast.warning(`PIN must be 6 digits`, {
          icon: ({theme, type}) =>  <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24"/>,
          theme: "dark",
        });
    return;
  }
  if (offcanvasTitle === 'Set PIN') {
    createWallet(pin);
  } else if ((offcanvasTitle === 'Check Private Key') || (offcanvasTitle === 'Check Private Key' && wallet)) {
    checkPrivateKey(pin);
  }
  setShowOffcanvas(false);
  setPin('');
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
        encryptedPrivateKey: cipher,
        checksum: checksum
      };
      setWallet(secureWallet);
      onWalletCreation(secureWallet);
    });
  };

  const checkPrivateKey = (incomingPin) => {
    const bytesCheck = CryptoJS.AES.decrypt(wallet.encryptedPrivateKey, incomingPin);
    const originalPrivateKey = bytesCheck.toString(CryptoJS.enc.Utf8);
    const cipherCheck = CryptoJS.AES.encrypt(originalPrivateKey, incomingPin).toString();
    const checksumCheck = crc.crc32(cipherCheck).toString(16);
    const checksumBase  = wallet.checksum;

    if (originalPrivateKey === '' || checksumBase === !checksumCheck) {
      alert(`Invalid PIN ${checksumBase} - ${checksumCheck}`);
    } else {
      alert(`Your private key is: ${originalPrivateKey}`);
    }
      toast.info(`Please keep your private keys safe!`, {
      icon: ({theme, type}) =>  <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24"/>,
      theme: "dark",
    }); 

  };

  const handleCreateWallet = () => {
    setOffcanvasTitle('Set PIN');
    setShowOffcanvas(true);
  };

  const handleCheckPrivateKey = () => {
      setOffcanvasTitle('Check Private Key');
      setShowOffcanvas(true);
  };


  const handleClearPin = () => {
    setPin('');
  };


  return (
    <div className="">
      
      <button className={`btn btn-outline-success btn-lg m-2 ${wallet ? `d-none` : `` }`} onClick={handleCreateWallet}>Begin Activation</button>
      <button className={`btn btn-outline-success m-2 ${wallet ? `` : `d-none` }`} onClick={handleCheckPrivateKey}>Confirm PIN</button>
      <BarLoader className={`m-auto bg-primary ${wallet ? `d-none` : `` }`} color="#109e77" size={120} />
      
      <div className={`offcanvas pinpad offcanvas-bottom ${showOffcanvas ? 'show' : ''}`} tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasBottomLabel">{offcanvasTitle}</h5>
          <button type="button" className="btn-close btn-close-white text-reset" onClick={handleOffcanvasClose}></button>
        </div>
        <div className="offcanvas-body container">
          <div className="row">
            <div className="col d-none d-md-block d-sm-none"></div>
            <div className="col">
              <div className="row justify-content-between">
        {Array(6).fill().map((_, index) => (
          <div key={index} className={`col border text-center text-light mx-2 p-3 ${pin[index] ? 'border-success' : 'border-primary'}`}>
            <h4 className="text-success m-auto">{pin[index] ? '*' : '_'}</h4>
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
              
              <button className="btn btn-success btn-lg w-100 mt-5" onClick={handleOffcanvasSubmit}>Continue</button>
            </div>
            <div className="col d-none d-md-block d-sm-none"></div>
          </div>
        </div>
      </div>

      {wallet && (
        <div className="text-light text-start m-3 bg-black p-3 border border-info">
          <small>Your Public Address: {wallet.address.base58}</small><br/>
          <small>PIN: ******</small>
        </div>
      )}
    </div>
  );
};

export default CreateWallet;