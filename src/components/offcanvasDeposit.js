import React, { useState } from 'react';
import Dialpad from './dialpad';

const OffcanvasDeposit = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [depositDetails, setDepositDetails] = useState('');

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
  };

  const handleDepositDetailsChange = (event) => {
    setDepositDetails(event.target.value);
  };

  const handleConfirmDeposit = () => {
    // Handle transfer logic
    console.log('Deposit confirmed');
  };

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasDeposit" aria-labelledby="offcanvasDepositLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDepositLabel">Deposit Funds</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div className="mb-3">

        </div>
        //TODO Deposit options
      </div>
    </div>
  );
};

export default OffcanvasDeposit;
