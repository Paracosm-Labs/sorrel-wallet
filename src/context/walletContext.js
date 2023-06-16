import React, { createContext, useState } from 'react';
import CryptoJS from 'crypto-js';
import crc from 'crc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletData, setWalletData] = useState(null);

  // ({
  //   //dummy wallet info
  //   address: {
  //     base58: 'TCiJCtTBhGSw8mMYYts67vCXUjdoFLLuYw',
  //     hex: '417E4AAA33079E34F1CCCF5B985EA4863B82118C15'
  //   },
  //   encryptedPrivateKey: 'U2FsdGVkX19T7k5SeKGFAPBaxDwy72I26Mavuk3mkO5oqWIiID2TYnu2W4V0ss0cT7jmVCQAfKJGNo/NaYWKTaXB6zG29GVKYXrrywitS9qD+ihpz/eXQu8kPEbBWbsD',
  //   checksum: '7ddb8a40',
  //   dataSources: 'data-sources-0x'
  // });

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
    <WalletContext.Provider value={{ walletData, setWalletData, checkPIN }}>
      {children}
    </WalletContext.Provider>
  );
};
