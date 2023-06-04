import React, { useState } from 'react';
import Navigation from '../components/navMenu';
import OffcanvasTransfer from '../components/offcanvasTransfer';
import LogoImg from '../img/logo2x.png';

const AddonsPage = () => {
  const dummyAddons = [

  {
    id: 1,
    label: "Sorrel Wallet Card & Concierge",
    goal: "$18,000+",
    link: "https://docs.sorrelbanq.org/addons/wallet-nfc-cards",
    progress: 12,
    status:1,
    address: "TL0x22-Addon-34",
  },

  {
    id: 2,
    label: "Sorrel AIA Team",
    goal: "$18,000+",
    link: "https://docs.sorrelbanq.org/addons/aia-team",
    progress: 3,
    status:1,
    address: "TL0x15-Addon-534",
  },

  {
    id: 3,
    label: "Sorrel Branch Lounges",
    goal: "$18,000+",
    link: "https://docs.sorrelbanq.org/addons/lounges",
    progress: 3,
    status:1,
    address: "TL0x12-Addon-7734",
  },

  {
    id: 4,
    label: "Sorrel Pay",
    goal: "$30,000+",
    link: "https://docs.sorrelbanq.org/addons/sorrelpay",
    progress: 0,
    status:0,
    address: "TL0x18-Addon-8234",
  },

  {
    id: 5,
    label: "Sorrel Family Office",
    goal: "TBD",
    link: "https://docs.sorrelbanq.org/addons/family-office",
    progress: 0,
    status:0,
    address: "TL0x12-Addon-9934",
  },
    // Add more dummy addons as needed
  ];

  const [selectedAddonAddress, setSelectedAddonAddress] = useState('');

  const handleAddonAddress = (address) => {
    setSelectedAddonAddress(address);
    console.log(`Preparing to fund addon at ${address}`);
  };

  return (
    <>
    <div className="crowdfunder">
    <Navigation></Navigation>
    <div>
      {dummyAddons.map((addon) => (
        <div key={addon.id} className="card mb-3">
          <div className="row g-0">
            <div className="col-2">
              <img src={LogoImg} alt={addon.label} className="img-fluid m-4" width="42" />
            </div>
            <div className="col-10">
              <div className="card-body">
                <h5 className="card-title">{addon.label}</h5>
                <a href={addon.link} target="_blank" rel="noreferrer">Learn More</a>
                <p className="card-text">
                  <strong>Goal:</strong> {addon.goal}
                </p>
                <div className="progress">
                  <div className="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${addon.progress}%` }} aria-valuenow={addon.progress} aria-valuemin="0" aria-valuemax="100">
                  </div>
                  <span className="m-auto">{addon.progress}%</span>
                </div>
                <button onClick={() => handleAddonAddress(addon.address)} className="btn btn-lg btn-outline-secondary mt-3 w-100" disabled={addon.status === 0} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTransfer" aria-controls="offcanvasTransfer">Fund</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <OffcanvasTransfer selectedSorrelAddress={selectedAddonAddress} />
    </div>
    </>
  );
};

export default AddonsPage;