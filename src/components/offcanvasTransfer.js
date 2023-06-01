import React, { useState } from 'react';
import AddressBook from './addressBook';
import Dialpad from './dialpad';

const OffcanvasTransfer = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  
  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
  };


  const handleConfirmTransfer = () => {
    // Handle transfer logic
    console.log('Transfer confirmed');
  };



  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasTransfer" aria-labelledby="offcanvasTransferLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasTransferLabel">Transfer To</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div className="mb-3">
          <AddressBook></AddressBook>
        </div>

        <Dialpad></Dialpad>
      </div>
    </div>
  );
};

export default OffcanvasTransfer;
