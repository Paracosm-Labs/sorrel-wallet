import React from 'react';

const CurrencyItem = ({ currency, balance }) => {
  return (
    <div className="account-item row align-items-center">
      <div className="col-auto d-inline-flex">
        <img className="rounded-circle currency-icon" src={`https://placehold.it/42x42?text=${currency}`} alt={currency} />
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
    { currency: 'TTD', balance: 1000 },
    { currency: 'XCD', balance: 750 },
  ];

  return (
    <div className="container mt-2">
      <h6>Accounts</h6>
      <div className="account-list">
        {accountBalances.map((account, index) => (
          <CurrencyItem key={index} currency={account.currency} balance={account.balance} />
        ))}
      </div>
    </div>
  );
};

export default CurrencyBalance;
