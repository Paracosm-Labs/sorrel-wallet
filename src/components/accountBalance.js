import React, { useState, useEffect } from 'react';
import OffcanvasDeposit from './offcanvasDeposit';
import OffcanvasTransfer from './offcanvasTransfer';
import gTTDImg from '../img/gttd.png';

const AccountBalance = () => {
  const [balance, setBalance] = useState(0);


  useEffect(() => {
    // Fetch user's gStableId 1 balance from the contract
    const fetchBalance = async () => {
      // Call the contract's function to retrieve the balance
      // const userBalance = await bank.gStableBalanceMap(gStableId, address);

      // Update the balance state
      setBalance("142,369.88");
    };

    // Call the fetchBalance function
    fetchBalance();
  }, []);


  return (
    <div className="account-balance mb-4">
      <div className="card">
        <div className="card-body mx-5">
          <h6 className="mt-2"><img src={gTTDImg} alt="" className="currency-icon rounded-circle px-1" height="24" />
          TTD Balance</h6>
          <h1 className="card-text"><span className="text-muted">$</span>{balance}</h1>
        </div>

      </div>
      <OffcanvasDeposit></OffcanvasDeposit>
      <OffcanvasTransfer></OffcanvasTransfer>
    </div>
  );
};

export default AccountBalance;
