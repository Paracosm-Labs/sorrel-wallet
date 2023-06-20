import React, { useState, useContext } from 'react';
import CryptoJS from 'crypto-js';
import TronWeb from 'tronweb';
import AddressBook from './addressBook';
import Dialpad from './dialpad';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';
import OffcanvasPinpad from './offcanvasPinpad';
import { WalletContext } from '../context/walletContext';
import { TronWebContext } from '../context/tronWebContext';
import Web3 from 'web3';
import { useEnergyUtils } from '../utils/tronNrg';


const OffcanvasTransfer = ({ selectedSorrelAddress }) => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [pin, setPin] = useState('');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [closeTransferPane, setCloseTransferPane] = useState(null);
  const [offcanvasTitle, setOffcanvasTitle] = useState('');
  const walletContext = useContext(WalletContext);
  const { tronWeb, bankDepository,setTransactionCompleted, transactionCompleted, demoKey } = useContext(TronWebContext);
  const { getAvailableEnergy, rentEnergy } = useEnergyUtils();

  const handleDestinationChange = (event) => {
    setSelectedDestination(event);
  };

  const handlePinConfirmation = (amount) => {
    if ((selectedDestination  || selectedSorrelAddress) && amount) {
      //TODO check for available  balance  in account
      setOffcanvasTitle('Enter PIN to Confirm');
      setSendAmount(amount);
      setShowOffcanvas(true);  
    } else {
      alert("Please ensure you have entered all details correctly.");
    }

  }

  const resetPane  = () => {
    setCloseTransferPane(false);
    setPin(``);
  }


  const confirmPin  = (data) => {
    setPin(data)
  }

  const handleConfirmTransfer = async () => {
    // Process transfer using thet selected address
    if (walletContext.walletData) {

      if (walletContext.checkPIN(pin)) { // Check the pin before proceeding

        // Decrypt the private key using the pin
        const bytes = CryptoJS.AES.decrypt(walletContext.walletData.encryptedPrivateKey, pin);
        const privateKey = bytes.toString(CryptoJS.enc.Utf8);

         toast.success(`Sending...`, {
            icon: ({theme, type}) =>  <img src={LogoImg} alt="Sorrel Logo" className="rounded-circle me-5" height="24"/>,
            theme: "dark",
          });

        // Create a new instance of TronWeb using the decrypted private key
        const userTronWeb = new TronWeb({
          fullHost: tronWeb.fullNode,
          privateKey: privateKey,
        });

        // Get the contract instance
        const contract = await userTronWeb.contract().at(bankDepository);

        const amount = Web3.utils.toWei(sendAmount, 'ether');

        if (selectedSorrelAddress) {
        // Call the contract's send function for Sorrel transfer
        await contract.send(1, amount, selectedSorrelAddress).send({
          from: walletContext.walletData.address.base58
        });

        } else {
          // Call the contract's send function for Member transfer
          await contract.send(1, amount, selectedDestination).send({
            from: walletContext.walletData.address.base58
          });
        }
        //TODO
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


      } else {
        setPin('');
        alert(`invalid PIN.`);
        return;
      }


    } else {
        //demo mode if there is no wallet loaded
        const  validTestPin = '000000';
        const isValidTestPin = (pin  === validTestPin);
        if (isValidTestPin) {

         toast.success(`Sending...`, {
            icon: ({theme, type}) =>  <img src={LogoImg} alt="Sorrel Logo" className="rounded-circle me-5" height="24"/>,
            theme: "dark",
          });

          // Create a new instance of TronWeb using the decrypted private key
          const userTronWeb = new TronWeb({
            fullHost: tronWeb.fullNode,
            privateKey: demoKey,
          });

          if (!tronWeb) {
            alert('tronWeb is not initialized.');
          }
          // Get the contract instance
          const contract = await userTronWeb.contract().at(bankDepository);
          const amount = Web3.utils.toWei(sendAmount, 'ether');

          if (selectedSorrelAddress) {
          // Call the contract's send function for Sorrel transfer
          await contract.send(1, amount, selectedSorrelAddress).send();

          } else {
            // Call the contract's send function for Member transfer
            await contract.send(1, amount, selectedDestination).send();
          }
          // After the transaction is sent
          setTransactionCompleted(true);
          setTimeout(() => setTransactionCompleted(false), 1000);

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

             } else {
                // show error message
                setPin('');
                alert(`invalid PIN!! Use test pin: ${validTestPin}`);
              }
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
          <>
          <div className="text-center m-5"><i className="fa fa-solid fa-circle-check fa-lg text-success"></i></div>
          <button onClick={resetPane} type="button" className={`mt-5 btn btn-lg w-100 btn-success`} data-bs-dismiss="offcanvas">
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
        setPin={confirmPin}
        handleOffcanvasSubmit={handleConfirmTransfer} 
      />

    </>
  );
};

export default OffcanvasTransfer;
