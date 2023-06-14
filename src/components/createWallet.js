import React, { useState } from 'react';
import TronWeb from 'tronweb';
import CryptoJS from 'crypto-js';
import crc from 'crc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';
import BarLoader from "react-spinners/BarLoader";
import OffcanvasPinpad from './offcanvasPinpad';

const CreateWallet = ({ onWalletCreation }) => {
  const [wallet, setWallet] = useState(null);
  const [pin, setPin] = useState('');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [offcanvasTitle, setOffcanvasTitle] = useState('');


  const handleNFCRead = (data) => {
    setWallet(data);
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
    if ((offcanvasTitle === 'Reset Pin') || (offcanvasTitle === 'Reset Pin' && wallet)) {
      // resetPin(pinOriginal, pinNew);
      alert("Soon!");
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
          return
          } else {
            alert(`PIN Confirmed. This is your Private Key: ${originalPrivateKey}`);
            toast.warning(`Please keep your private keys safe!`, {
            icon: ({theme, type}) =>  <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24"/>,
            theme: "dark",
          });  
          }

        } catch (error) {
          alert(`Invalid PIN.`);
            toast.warning(`Please keep your private keys safe!`, {
            icon: ({theme, type}) =>  <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24"/>,
            theme: "dark",
          }); 
          return;
        }



      } catch (error) {
        alert(`${error}`);
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



  return (
    <div className="text-white">
      
      <button className={`btn btn-outline-success btn-lg m-2 ${wallet ? `d-none` : `` }`} onClick={handleCreateWallet}>Begin Activation</button>
      <button className={`btn btn-outline-success m-2 ${wallet ? `` : `d-none` }`} onClick={handleCheckPrivateKey}>Confirm PIN</button>
      <BarLoader className={`m-auto bg-primary ${wallet ? `d-none` : `` }`} color="#109e77" size={120} />

      <OffcanvasPinpad 
        showOffcanvas={showOffcanvas} 
        setShowOffcanvas={setShowOffcanvas} 
        offcanvasTitle={offcanvasTitle} 
        pin={pin} 
        setPin={setPin} 
        handleOffcanvasSubmit={handleOffcanvasSubmit} 
      />

      {wallet && (
        <div className="text-light text-start m-3 bg-black p-3 border border-info">
          <small>Your Public Address: {wallet.address.base58}</small><br/>
          <small>PIN: <span className="text-wrap">******</span></small>
        </div>
      )}
    </div>
  );
};

export default CreateWallet;