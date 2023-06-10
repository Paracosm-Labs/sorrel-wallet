import React, { useState, useEffect } from 'react';
import gTTDImg from '../img/gttd.png';
import { formatM } from '../utils/currencyFormatter';
import { BeatLoader } from 'react-spinners';
import tronWeb from "../utils/tronWeb";

const AccountBalance = () => {
  const [balance, setBalance] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  //Mainnet
  // const contractAddress = 'TNYsTzEyH5Jr2BuagKhfTCTjeaLRaRu1Av';
  
  //Nile
  const contractAddress = 'TQoiUFedkHM2RiBNCbDCMBFwAf8HTX8qKc';


    //function to handle the logic of making the value animate then back to normal.
    const handleValueAnimate = () => {
      // set the value to animation
      setIsAnimated(true);
      
      // after 1.5 second, set the value back to normal
      setTimeout(() => {
        setIsAnimated(false);
      }, 1500);
    }


  useEffect(() => {
    const fetchBalance = async () => {
      // Call the contract's function to retrieve the balance
     try {
          const banq = await window.tronWeb.contract().at(contractAddress);
          const userBalance = await banq.gStableBalanceMap(1,"TCiJCtTBhGSw8mMYYts67vCXUjdoFLLuYw").call();
          // Update the balance state
          const gStableBalance =  userBalance / (10 ** 18);
          setBalance(gStableBalance);
          console.log(balance);
          if (balance !== 0) {
            handleValueAnimate();
          }
      } catch (e) {
        console.error(e);
      }

    };

    if (tronWeb) {
      fetchBalance();
    }
  }, [tronWeb]);

  if (!tronWeb) {
    return <div className="text-center m-auto"><BeatLoader color="#109e77" size={10} /></div>;
  };


  const formattedBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);

  return (
    <div className="account-balance mb-4">
      <div className="card">
        <div className="card-body mx-5 text-center">
          <h6 className="mt-2"><img src={gTTDImg} alt="" className="currency-icon rounded-circle px-1" height="24" />
          TTD Balance</h6>
          <h1 className="card-text">
            {balance ? <span className={isAnimated ? 'vibrate-1' : '' }>{formattedBalance}</span> 
            : 
            <BeatLoader color="#109e77" size={10} />}
          </h1>
        </div>

      </div>
    </div>
  );
};

export default AccountBalance;
