import React, { useState, useEffect, useContext} from 'react';
import gTTDImg from '../img/gttd.png';
// import { formatM } from '../utils/currencyFormatter';
import { BeatLoader } from 'react-spinners';
import { WalletContext } from '../context/walletContext';
import { TronWebContext } from '../context/tronWebContext';

const AccountBalance = () => {
  const [balance, setBalance] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const walletContext = useContext(WalletContext);
  const { tronWeb, bankDepository,transactionCompleted, setTransactionCompleted, demoSorrelMember } = useContext(TronWebContext);


  const walletAddress = (walletContext.walletData ? walletContext.walletData.address.base58 : demoSorrelMember);


  // Function to handle the logic of making the value animate then back to normal.
  const handleValueAnimate = () => {
    // Set the value to animation
    setIsAnimated(true);

    // After 1.5 second, set the value back to normal
    setTimeout(() => {
      setIsAnimated(false);
    }, 1500);
  }

  useEffect(() => {
    const fetchBalance = async () => {
      // Call the contract's function to retrieve the balance
      try {
        if (!tronWeb || !tronWeb.contract) {
          alert('tronWeb is not initialized');
        }
        const banq = await tronWeb.contract().at(bankDepository);
        // Call the contract's gstablebalancemap function
        // const result = await banq.gStableBalanceMap(1,walletAddress).call();
        const result = await banq.gStableBalanceMap(1,walletAddress).call();
        // Update the balance state
        const gStableBalance = result / (10 ** 18);
        setBalance(gStableBalance);
        if (balance !== 0) {
          handleValueAnimate();
        }
      } catch (e) {
        console.error(e);
        alert(demoSorrelMember);

      }
    };
      fetchBalance();
  }, [tronWeb, bankDepository, transactionCompleted]);

  if (!tronWeb) {
    return <div className="text-center m-auto"><BeatLoader color="#109e77" size={30} /></div>;
  };

  const formattedBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);

  return (
    <div className="account-balance mb-4">
      <div className="card">
        <div className="card-body mx-5 text-center">
          <h6 className="mt-2"><img src={gTTDImg} alt="Currency" className="currency-icon rounded-circle px-1" height="24" />
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
