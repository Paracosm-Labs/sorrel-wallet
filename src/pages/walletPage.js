import React from 'react';
import AccountBalance from '../components/accountBalance';
import AccountActions from '../components/accountActions';
// import CurrencyBalance from '../components/currencyBalance';
import PromoSlide from '../components/promoSlide'
import TxnHistory from '../components/txnHistory'
import Navigation from '../components/navMenu';
// import BottomNav from '../components/bottomNav';

const AccountsPage = () => {
  return (
    <div className="wallet">
      
      <Navigation></Navigation>
      <AccountBalance></AccountBalance>
      <AccountActions></AccountActions>
      <PromoSlide></PromoSlide>
      {/* <CurrencyBalance></CurrencyBalance> */}
      <TxnHistory></TxnHistory>

    </div>
  );
};

export default AccountsPage;
