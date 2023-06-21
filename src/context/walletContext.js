import React, { createContext, useState } from 'react';
import TronWeb from 'tronweb';
import CryptoJS from 'crypto-js';
import crc from 'crc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletData, setWalletData] = useState(null);
  const [country, setCountry] = useState(null);


  const setCountryFromLocalStorage = () => {
  const selectedCountry = localStorage.getItem('selectedCountry');
  setCountry(selectedCountry);
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
        checksum: checksum,
        country: country,
        activated: "false"
      };
      setWalletData(secureWallet);
    });
  };





  const checkPIN = (pin) => {

    const bytesCheck = CryptoJS.AES.decrypt(walletData.encryptedPrivateKey, pin);
    try {
        let originalPrivateKey;

        try {
          originalPrivateKey = bytesCheck.toString(CryptoJS.enc.Utf8);

          // Check if the decrypted private key is a valid Tron private key
          if (!/^([A-Fa-f0-9]{64})$/.test(originalPrivateKey) || originalPrivateKey === '' ) {
            toast.warning(`Invalid PIN.`, {
            icon: ({theme, type}) =>  <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24"/>,
            theme: "dark",
          }); 
          return false;
          } else {
          return true; 
          }

        } catch (error) {
            toast.warning(`Invalid PIN.`, {
            icon: ({theme, type}) =>  <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24"/>,
            theme: "dark",
          }); 
          return false;
        }

      } catch (error) {
        alert(`${error}`);
        return false;
      }


  };

  return (
    <WalletContext.Provider value={{ 
      walletData, 
      setWalletData, 
      checkPIN, 
      country, 
      setCountryFromLocalStorage,
      createWallet 
    }}>
      {children}
    </WalletContext.Provider>
  );
};
