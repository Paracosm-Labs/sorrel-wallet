import React, { useState, useEffect } from 'react';
import gTTDImg from '../img/gttd.png';

const AccountBalance = () => {
  const [balance, setBalance] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

    //function to handle the logic of making the value animate then back to normal.
    const handleValueAnimate = () => {
      // set the value to animation
      setIsAnimated(true);
      
      // after 1 second, set the value back to normal
      setTimeout(() => {
        setIsAnimated(false);
      }, 1500);
    }


  useEffect(() => {
    // Fetch user's gStableId 1 balance from the contract
    const fetchBalance = async () => {
      // Call the contract's function to retrieve the balance
      // const userBalance = await bank.gStableBalanceMap(gStableId, address);

      // Update the balance state
      setBalance("142,369.88");
      if (balance !== 0) {
        handleValueAnimate();
      }

    };

    // Call the fetchBalance function
    fetchBalance();
  }, [balance]);


  return (
    <div className="account-balance mb-4">
      <div className="card">
        <div className="card-body mx-5 text-center">
          <h6 className="mt-2"><img src={gTTDImg} alt="" className="currency-icon rounded-circle px-1" height="24" />
          TTD Balance</h6>
          <h1 className="card-text">
            <span className="text-muted">$</span>
            <span className={isAnimated ? 'vibrate-1' : '' }>{balance}</span>
          </h1>
        </div>

      </div>
    </div>
  );
};

export default AccountBalance;
