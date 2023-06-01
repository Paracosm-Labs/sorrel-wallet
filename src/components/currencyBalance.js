import React from 'react';
import TTDImg from '../img/gttd.png';
import XCDImg from '../img/gxcd.png';
import BBDImg from '../img/gbbd.png';
import JMDImg from '../img/gjmd.png';
import DOPImg from '../img/gdop.png';

const CurrencyItem = ({logo, currency, balance }) => {
  return (
    <div className="account-item row align-items-center">
      <div className="col-auto d-inline-flex">
        <img className="rounded-circle currency-icon" src={logo} alt={currency} />
        <b>&nbsp;{currency}</b>
      </div>
      <div className="col">
        
      </div>
      <div className="col">
        <p className="text-end">{balance}</p>
      </div>
    </div>
  );
};

const CurrencyBalance = () => {
  const accountBalances = [
    { currency: 'TTD', balance: 10000, logo: TTDImg },
    { currency: 'XCD', balance: 9750, logo: XCDImg },
    { currency: 'BBD', balance: 7050, logo: BBDImg },
    { currency: 'JMD', balance: 25000, logo: JMDImg },
    { currency: 'DOP', balance: 1750, logo: DOPImg },
  ];

  return (
    <div className="container mt-2">
      <h6>Accounts</h6>
      <div className="account-list">
        {accountBalances.map((account, index) => (
          <CurrencyItem key={index} logo= {account.logo} currency={account.currency} balance={account.balance} />
        ))}
      </div>
    </div>
  );
};

export default CurrencyBalance;
