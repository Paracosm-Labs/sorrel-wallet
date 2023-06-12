import React, { useState, useEffect } from 'react';
import TronWeb from 'tronweb';
import CryptoJS from 'crypto-js';
import crc from 'crc';

const CreateWallet = ({ onWalletCreation, pin }) => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
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
  }, [onWalletCreation, pin]);

  return wallet ? (
    <div className="text-white m-3">
      <small>Public Address: {wallet.address.base58}</small><br/>
      <small>Private Key Encrypted: ****** {/* wallet.privateKey */}</small>
    </div>
  ) : (
    <p>Creating wallet...</p>
  );
};

export default CreateWallet;
