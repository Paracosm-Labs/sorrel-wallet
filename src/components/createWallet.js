import React, { useState, useEffect } from 'react';
import TronWeb from 'tronweb';

const CreateWallet = ({ onWalletCreation }) => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    TronWeb.createAccount().then(newWallet => {
      setWallet(newWallet);
      onWalletCreation(newWallet);
    });
  }, [onWalletCreation]);

  return wallet ? (
    <div className="text-white m-5">
      <small>Public Address: {wallet.address.base58}</small><br/>
      <small>Private Key: Hidden {/* wallet.privateKey */}</small>
    </div>
  ) : (
    <p>Creating wallet...</p>
  );
};

export default CreateWallet;
