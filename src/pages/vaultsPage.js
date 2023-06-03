import React, { useState } from 'react';
import AccountBalance from '../components/accountBalance';
import Navigation from '../components/navMenu';
import OffcanvasTransfer from '../components/offcanvasTransfer';
import LogoImg from '../img/logo2x.png';
import gTTDImg from '../img/gttd.png';

const VaultsPage = () => {

  const vaults = [
    { id: 1, icon: gTTDImg, name: 'TTD', details: '3 Month Lock',  apr:"2%", unlockTime: 6664300400, balance: '$3,500.69',address:'TLX0tttAM' },
    { id: 2, icon: gTTDImg, name: 'TTD', details: '6 Month Lock',  apr:"2%", unlockTime: 6664311200, balance: '',address:'TLX0aaDM' },
    { id: 3, icon: gTTDImg, name: 'TTD', details: '12 Month Lock', apr:"2%",  unlockTime: 1664322000, balance: '$500.83',address:'TLX0xxxPM' },
  ];

  const [selectedVaultAddress, setselectedVaultAddress] = useState('');
  
  const handleVaultAddress = (address) => {
    setselectedVaultAddress(address);
    console.log(`Preparing to transfer to Vault ${address}`);
  };

  const handleRedeem = (address) => {
    console.log(`Redeemed from Vault ${address}`);
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
    <div className="">
      {vaults.map((vault) => (
        <div key={vault.id} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-2 col-sm-3">
              <img src={gTTDImg} alt={vault.name} className="img-fluid m-4" width="50" />
            </div>
            <div className="col-md-10 col-sm-9">
              <div className="card-body">
                <h5 className="card-title">{vault.name}</h5>
                <a href={vault.id} target="_blank" rel="noreferrer">Learn More</a>
                <p className="card-text">
                  <strong>My Deposit:</strong> {vault.balance}
                </p>
                <div className="progress">
                  <div className="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${vault.id}%` }} aria-valuenow={vault.id} aria-valuemin="0" aria-valuemax="100">
                  </div>
                  <span className="m-auto">{vault.id}%</span>
                </div>
                <div className="d-flex">
                <button onClick={() => handleVaultAddress(vault.address)} className="btn btn-lg btn-outline-secondary mt-3 w-50 mx-2"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTransfer" aria-controls="offcanvasTransfer">Deposit</button>

                <button
                  className="btn btn-outline-secondary btn-lg w-50 mx-2 mt-3"

                  onClick={() => handleRedeem(vault.address)}
                  disabled={!isUnlockTimePassed(vault.id)}
                >
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

export default VaultsPage;
