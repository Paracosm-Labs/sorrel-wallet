import React, { useState } from 'react';
import AddressBook from './addressBook';
import Dialpad from './dialpad';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';

const OffcanvasTransfer = ({ selectedAddonAddress, selectedVaultAddress }) => {
  const [selectedDestination, setSelectedDestination] = useState('');

  const handleDestinationChange = (event) => {
    setSelectedDestination(event);
  };

  const handleConfirmTransfer = (amount) => {
    // Process transfer using the selected address
    toast.success(`Sent ${amount} to ${selectedDestination}`, {
      icon: ({theme, type}) =>  <img src={LogoImg} className="rounded-circle" height="32"/>,
      theme: "dark",
    });

    console.log('Transfer of', amount, 'to address:', selectedDestination);
  };

  return (
    <>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasTransfer" aria-labelledby="offcanvasTransferLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasTransferLabel">Transfer Funds</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <AddressBook onContactSelect={handleDestinationChange} selectedAddonAddress={selectedAddonAddress} selectedVaultAddress={selectedVaultAddress}/>
          <Dialpad onConfirm={handleConfirmTransfer} selectedDestination={selectedDestination} />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default OffcanvasTransfer;
