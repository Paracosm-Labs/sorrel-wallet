import React, { useState } from 'react';
import Navigation from '../components/navMenu';
import AccountBalance from '../components/accountBalance';
import OffcanvasTransfer from '../components/offcanvasTransfer';
import LogoImg from '../img/logo2x.png';
import gTTDImg from '../img/gttd.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EarnPage = () => {

  const vaults = [
    { id: 1, icon: gTTDImg, name: 'TTD', details: '3 Month Lock',  apr:"2%", unlockTime: 1664300400, balance: '$3,500.69',address:'TLX0tttA-Vault-AM' },
    { id: 2, icon: gTTDImg, name: 'TTD', details: '6 Month Lock',  apr:"2%", unlockTime: 2664311200, balance: '',address:'TLX0aaDM-Vault-AP' },
    { id: 3, icon: gTTDImg, name: 'TTD', details: '12 Month Lock', apr:"2%",  unlockTime: 6664322000, balance: '$500.83',address:'TLX0xxxP-Vault-AX' },
  ];


  const [selectedVaultAddress, setSelectedVaultAddress] = useState('');

  const handleVaultAddress = (address) => {
    setSelectedVaultAddress(address);
    console.log(`Preparing transfer to vault at ${address}`);
  };


  const handleRedeem = (address) => {
    console.log(`Redeeming from Vault ${address}`);
    toast.success(`Successfully redeemed from ${address}`, {
      icon: ({theme, type}) =>  <img src={LogoImg} className="rounded-circle me-5" height="24"/>,
      theme: "dark",
    });
  };

  const isUnlockTimePassed = (vaultId) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > vaults.find((vault) => vault.id === vaultId)?.unlockTime;
  };

  return (
    <>
    <div className="vaults">
    <Navigation></Navigation>
    <AccountBalance></AccountBalance>
    <div>
      {vaults.map((vault) => (
        <div key={vault.id} className="card mb-3">
          <div className="row g-0">
            <div className="col">
              <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title">
                    <img src={vault.icon} alt={vault.name} className="align-bottom" width="22" />&nbsp;
                  {vault.name} Vault</h5>
                  <p className="card-text">
                    {(vault.balance) ? vault.balance : (<small className="text-muted">No Deposits</small>)}<br/>
                    <small className="text-muted"><i className="fa-regular fa-sm fa-clock"></i>&nbsp;{vault.details}</small>
                  </p>
                </div>
                <div className="col">
                  <p className="text-end"><b className="text-success">{vault.apr}+ APR</b></p>
                </div>
              </div>

                
                <div className="d-flex">
                <button onClick={() => handleVaultAddress(vault.address)} className="btn btn-lg btn-outline-secondary mt-3 w-100 mx-2"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTransfer" aria-controls="offcanvasTransfer">
                <i className="fa-solid fa-sm fa-right-from-bracket"></i>&nbsp;
                Deposit</button>

                <button
                  className="btn btn-outline-secondary btn-lg w-100 mx-2 mt-3"

                  onClick={() => handleRedeem(vault.address)}
                  disabled={!isUnlockTimePassed(vault.id)}
                >
                  <i className={!isUnlockTimePassed(vault.id) ? "fa fa-sm fa-lock" : "fa fa-sm fa-lock-open text-success"}></i>&nbsp;
                   Redeem
                </button>
              </div>
              </div>
            </div>
          </div>
          </div>

      ))}
    </div>

    <OffcanvasTransfer selectedSorrelAddress={selectedVaultAddress} />
    </div>
    </>
  );
};

export default EarnPage;