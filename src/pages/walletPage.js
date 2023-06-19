import React from 'react';
import AccountBalance from '../components/accountBalance';
import AccountActions from '../components/accountActions';
import CurrencyBalance from '../components/currencyBalance';
import PromoSlide from '../components/promoSlide'
import TxnHistory from '../components/txnHistory'
import Navigation from '../components/navMenu';
import { withAuth0 } from '@auth0/auth0-react';
// import { WalletContext } from '../context/walletContext';

const AccountsPage = () => {
  // const walletContext = useContext(WalletContext);

  return (
    <>
    <div className="wallet">
      
    
      <>
      <Navigation></Navigation>
      <AccountBalance></AccountBalance>
      <AccountActions></AccountActions>
      <PromoSlide></PromoSlide>
      <CurrencyBalance/>
      <TxnHistory></TxnHistory>
      </>



    </div>
    </>
  );
};

export default withAuth0(AccountsPage);
