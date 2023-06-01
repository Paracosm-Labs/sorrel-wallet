import React, { useState } from 'react';
import LogoImg from '../img/logo2x.png';
import gTTDImg from '../img/gttd.png';

const VaultAccordion = () => {
  const vaults = [
    { id: 1, icon: gTTDImg, name: 'TTD', details: '3 Month Lock',  apr:"2%", unlockTime: 6664300400, balance: '$3,500.69' },
    { id: 2, icon: gTTDImg, name: 'TTD', details: '6 Month Lock',  apr:"2%", unlockTime: 6664311200, balance: '' },
    { id: 3, icon: gTTDImg, name: 'TTD', details: '12 Month Lock', apr:"2%",  unlockTime: 1664322000, balance: '$500.83' },
  ];

  const [transactionAmount, setTransactionAmount] = useState('');

  const handleDeposit = (vaultId) => {
    // Handle deposit action for the given vaultId and transactionAmount
    console.log(`Deposit ${transactionAmount} to Vault ${vaultId}`);
    // Add your logic here to interact with the contract and perform the deposit
  };

  const handleRedeem = (vaultId) => {
    // Handle redeem action for the given vaultId and transactionAmount
    console.log(`Redeem ${transactionAmount} from Vault ${vaultId}`);
    // Add your logic here to interact with the contract and perform the redeem
  };

  const isUnlockTimePassed = (vaultId) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > vaults.find((vault) => vault.id === vaultId)?.unlockTime;
  };

  return (
    <div className="mt-4">
      <div className="accordion" id="vaultAccordion">
        {vaults.map((vault) => (
          <div key={vault.id} className="accordion-item  mb-3">
            <h2 className="accordion-header" id={`heading${vault.id}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${vault.id}`}
                aria-expanded="true"
                aria-controls={`collapse${vault.id}`}
              >
              <div className="w-100 row">
              <div className="col-2">
                <img src={LogoImg} alt={vault.name} className="vault-icon rounded-circle mx-2" height="42" />
              </div>
              <div className="col-6">
                <p className="text-start  mt-1">
                  <img src={vault.icon} alt={vault.name} className="vault-icon rounded-circle" height="16" />
                  <span className="vault-name">{vault.name}<br/>
                  <small className="text-sm  text-muted">{vault.details}</small></span>
                </p>  
              </div>
              <div className="col-4">
                <p className="vault-balance mt-1"><b className="text-success">{vault.apr}+ APR</b><br/>{vault.balance}</p>
              </div>
              </div>
              </button>
            </h2>
            <div
              id={`collapse${vault.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${vault.id}`}
              data-bs-parent="#vaultAccordion"
            >
              <div className="accordion-body">
                <div className="mb-3">
                  <label htmlFor={`transactionAmount${vault.id}`} className="form-label">
                    Enter Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`transactionAmount${vault.id}`}
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-around">
                  <button
                    className="btn btn-primary btn-lg w-50 mx-2"
                    onClick={() => handleDeposit(vault.id)}
                  >
                    Deposit
                  </button>
                  {isUnlockTimePassed(vault.id) && (
                    <button
                      className="btn btn-primary btn-lg w-50 mx-2"
                      onClick={() => handleRedeem(vault.id)}
                      disabled={!isUnlockTimePassed(vault.id)}
                    >
                      Redeem
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaultAccordion;
