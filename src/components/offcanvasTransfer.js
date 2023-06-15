import React, { useState } from 'react';
import AddressBook from './addressBook';
import Dialpad from './dialpad';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';
import OffcanvasPinpad from './offcanvasPinpad';

const OffcanvasTransfer = ({ selectedSorrelAddress }) => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [pin, setPin] = useState('');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [closeTransferPane, setCloseTransferPane] = useState(null);
  const [offcanvasTitle, setOffcanvasTitle] = useState('');

  const handleDestinationChange = (event) => {
    setSelectedDestination(event);
  };

  const handlePinConfirmation = (amount) => {
    setOffcanvasTitle('Enter PIN to Confirm');
    setSendAmount(amount);
    setShowOffcanvas(true);
    // alert("yea");
  }

  const resetPane  = () => {
    setCloseTransferPane(false);
  }

  const handleConfirmTransfer = async () => {
    // Process transfer using thet selected address
    setShowOffcanvas(false)
    setCloseTransferPane(true);

    if (selectedSorrelAddress) {
        toast.success(`Sent ${sendAmount} to ${selectedSorrelAddress}`, {
          icon: ({theme, type}) =>  <img src={LogoImg} alt="Sorrel Logo" className="rounded-circle me-5" height="24"/>,
          theme: "dark",
        });
        console.log(`Transferred ${sendAmount}, to address: ${selectedSorrelAddress}`);
    } else {
        toast.success(`Sent ${sendAmount} to ${selectedDestination}`, {
          icon: ({theme, type}) =>  <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24"/>,
          theme: "dark",
        });
        console.log(`Transferred ${sendAmount}, to address: ${selectedDestination}`);
    }
  };

  return (
    <>
      <div className={`offcanvas transfer offcanvas-end`} tabIndex="-1" id="offcanvasTransfer" aria-labelledby="offcanvasTransferLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasTransferLabel">Transfer Funds</h5>
          <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
        {!closeTransferPane ? (<>
          <AddressBook onContactSelect={handleDestinationChange} sorrelAddress={selectedSorrelAddress}/>
          <Dialpad onConfirm={handlePinConfirmation} selectedDestination={selectedDestination} />
          </>):(
          <><div className="text-center m-5"><i className="fa fa-solid fa-circle-check fa-lg text-success"></i></div>
          <button onClick={resetPane} type="button" className={`mt-5 btn btn-lg w-100 btn-success`} data-bs-dismiss="offcanvas" aria-label="Close">
            Finish
          </button>
          </>)}
        </div>
      </div>

      <OffcanvasPinpad 
        showOffcanvas={showOffcanvas} 
        setShowOffcanvas={setShowOffcanvas} 
        offcanvasTitle={offcanvasTitle} 
        pin={pin}
        handleOffcanvasSubmit={handleConfirmTransfer} 
      />


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
