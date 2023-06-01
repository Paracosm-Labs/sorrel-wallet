import React from 'react';
import TTDImg from '../img/gttd.png';
import XCDImg from '../img/gxcd.png';
import BBDImg from '../img/gbbd.png';
import JMDImg from '../img/gjmd.png';
import DOPImg from '../img/gdop.png';
import USDDImg from '../img/usdd.png';

const CurrencyItem = ({ logo, currency, balance }) => {
  return (
    <div className="col-sm-4">
      <div className="currency-item row text-center">
        <div className="">
          <img className="rounded-circle currency-icon m-1" src={logo} alt={currency} height="22" />
          <p>${balance}</p>
        </div>
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
    { currency: 'DOP', balance: 2500, logo: DOPImg },
    { currency: 'USDD', balance: 17750, logo: USDDImg },
  ];

  const rows = [];
  for (let i = 0; i < accountBalances.length; i += 3) {
    const rowItems = accountBalances.slice(i, i + 3);
    rows.push(rowItems);
  }

  return (
    <div className="mt-4">
      <h6 className="text-start text-muted mx-3">Currencies</h6>
      <div className="currencies mt-2">
        <ul className="list-group d-flex justify-content-between">
          {rows.map((row, index) => (
            <li key={index} className="list-group-item">
              <div className="row">
                {row.map((account, index) => (
                  <CurrencyItem
                    key={index}
                    logo={account.logo}
                    currency={account.currency}
                    balance={account.balance}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrencyBalance;
