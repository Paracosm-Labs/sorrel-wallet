import React, { useState } from 'react';
import TronWeb from 'tronweb';
import CryptoJS from 'crypto-js';
import crc from 'crc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';
import BarLoader from "react-spinners/BarLoader";
import OffcanvasPinpad from './offcanvasPinpad';
import NFCReaderWriter from './nfcReaderWriter';

const CreateWallet = ({ onWalletLoad }) => {
  const [wallet, setWallet] = useState(null);
  const [pin, setPin] = useState('');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [offcanvasTitle, setOffcanvasTitle] = useState('');
  const [isResettingPin, setIsResettingPin] = useState(false);
  const [isConfirmingOldPin, setIsConfirmingOldPin] = useState(false);


  const handleNFCRead = (data) => {
    setWallet(data);
    alert("Hi! Welcome to Sorrel!")
  };


  const handleOffcanvasSubmit = () => {
    if (pin.length !== 6) {
          toast.warning(`PIN must be 6 digits`, {
            icon: ({theme, type}) =>  <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24"/>,
            theme: "dark",
          });
      return;
    }
  if (isConfirmingOldPin) {
    const isPinCorrect = checkPrivateKey(pin);
    if (isPinCorrect) {
      const bytes = CryptoJS.AES.decrypt(wallet.encryptedPrivateKey, pin);
      const originalPrivateKey = bytes.toString(CryptoJS.enc.Utf8);
      setWallet({ ...wallet, privateKey: originalPrivateKey });
      setIsConfirmingOldPin(false);
      setIsResettingPin(true);
      setOffcanvasTitle("Enter New PIN");
      setPin('');
    } else {
      console.log("Invalid PIN");
      return;
    }

  } else if ((isResettingPin && offcanvasTitle === 'Check Private Key') || (isResettingPin && offcanvasTitle === 'Set PIN')) {
      checkPrivateKey(pin);
  }
  else if (isResettingPin) {
    resetPin(pin);
    alert("New Pin Set");

  }
    else if (offcanvasTitle === 'Set PIN') {
      createWallet(pin);
  } else if ((offcanvasTitle === 'Check Private Key') || (offcanvasTitle === 'Check Private Key' && wallet)) {
      checkPrivateKey(pin);
  }
    
  if ((offcanvasTitle === 'Set PIN') || (offcanvasTitle === 'Check Private Key')) {
    setShowOffcanvas(false);
    // setIsResettingPin(false);
  }
    
    setPin('');
  };



  const resetPin = (pin) => {
    const cipher = CryptoJS.AES.encrypt(wallet.privateKey, pin).toString();
    const checksum = crc.crc32(cipher).toString(16);
    // Create a new wallet object with the encrypted private key and checksum
    const secureWallet = {
      ...wallet,
      encryptedPrivateKey: cipher,
      checksum: checksum
    };
    setWallet(secureWallet);
    onWalletLoad(secureWallet);
    // setIsResettingPin(false);
    setShowOffcanvas(false);
  }


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
      onWalletLoad(secureWallet);
    });
  };

  const checkPrivateKey = (pin) => {
    const bytesCheck = CryptoJS.AES.decrypt(wallet.encryptedPrivateKey, pin);
    try {
        let originalPrivateKey;

        try {
          originalPrivateKey = bytesCheck.toString(CryptoJS.enc.Utf8);

          // Check if the decrypted private key is a valid Tron private key
          if (!/^([A-Fa-f0-9]{64})$/.test(originalPrivateKey) || originalPrivateKey === '' ) {
            alert(`Invalid PIN.`);
            toast.warning(`Please keep your private keys safe!`, {
            icon: ({theme, type}) =>  <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24"/>,
            theme: "dark",
          });
          setPin('');
          return false;
          } else {
            alert(`PIN Confirmed. This is your Private Key: ${originalPrivateKey}`);
            toast.warning(`Please keep your private keys safe!`, {
            icon: ({theme, type}) =>  <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24"/>,
            theme: "dark",
          }); 
          setPin('');
          return true; 
          }

        } catch (error) {
          alert(`Invalid PIN.`);
            toast.warning(`Please keep your private keys safe!`, {
            icon: ({theme, type}) =>  <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24"/>,
            theme: "dark",
          }); 
          setPin('');
          return false;
        }

      } catch (error) {
        alert(`${error}`);
        return false;
      }

  };

  const handleCreateWallet = () => {
    setOffcanvasTitle('Set PIN');
    setShowOffcanvas(true);
  };

  const handleCheckPrivateKey = () => {
      setOffcanvasTitle('Check Private Key');
      setShowOffcanvas(true);
  };

  const handleResetPin = () => {
    setOffcanvasTitle('Enter Current PIN');
    setIsConfirmingOldPin(true);
    setShowOffcanvas(true);
  };


  return (
    <div className="text-white">
      
      <button className={`btn btn-outline-success btn-lg m-2 ${wallet ? `d-none` : `` }`} onClick={handleCreateWallet}>Begin Activation</button>
      <button className={`btn btn-outline-success m-2 ${wallet ? `` : `d-none` }`} onClick={handleCheckPrivateKey}>Confirm PIN</button>
      <button className={`btn btn-outline-success m-2 ${wallet ? `` : `d-none` }`} onClick={handleResetPin}>Reset PIN</button>
      <BarLoader className={`m-auto bg-primary ${wallet ? `d-none` : `` }`} color="#109e77" size={120} />
      <OffcanvasPinpad 
        showOffcanvas={showOffcanvas} 
        setShowOffcanvas={setShowOffcanvas} 
        offcanvasTitle={offcanvasTitle} 
        pin={pin} 
        setPin={setPin} 
        handleOffcanvasSubmit={handleOffcanvasSubmit} 
      />

      {wallet && (<>
        <div className="text-light text-start m-3 bg-black p-3 border border-info">
          <small>Your Address: {wallet.address.base58}</small><br/>
          <small>PIN: <span className="text-wrap">******</span></small><br/>
          <small>CRC: {wallet.checksum}</small><br/>
          <small>Data: {wallet.dataSources}</small><br/>
        </div>
        <hr className="mx-2"/>
      <NFCReaderWriter
        address={wallet.address}
        encryptedPrivateKey={wallet.encryptedPrivateKey}
        checksum={wallet.checksum}
        wasPinReset={isResettingPin}
        onNFCRead={handleNFCRead}
      />
      </>

      )}




    </div>
  );
};

export default CreateWallet;