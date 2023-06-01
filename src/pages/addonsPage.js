import React from 'react';
import Navigation from '../components/navMenu';
import LogoImg from '../img/logo2x.png';

const AddonsPage = () => {
  const dummyAddons = [

  {
    id: 1,
    label: "Sorrel Wallet Cards",
    details: "Sorrel Wallet Cards are hardware wallets that store private keys securely on an NFC chip. These cards allow our members to easily access and manage their funds as well as sign transactions by simply tapping them on NFC enabled Android phones.",
    goal: "$18,000+",
    link: "https://docs.sorrelbanq.org/addons/cards",
    progress: 5,
    status:1,
  },

  {
    id: 2,
    label: "Sorrel AIA Concierge",
    details: "Jes, Sorrel's AIA Concierge will be able to provide members with support, tailored advice and recommendations based on their individual needs and preferences.",
    goal: "$18,000+",
    link: "https://docs.sorrelbanq.org/addons/concierge",
    progress: 5,
    status:1,
  },

  {
    id: 3,
    label: "Sorrel Branch Lounges",
    details: "Sorrel Lounges are powered by WebXR, where anyone can explore our services in a 3D immersive and interactive environment across all devices including VR. Sorrel Lounges will be designed to provide an engaging and personalized experience for our members along with a virtual events hosting space in the metaverse for anyone to use.",
    goal: "$18,000+",
    link: "https://docs.sorrelbanq.org/addons/lounges",
    progress: 5,
    status:1,
  },

  {
    id: 4,
    label: "Sorrel Pay",
    details: "Send to anyone, with or without a Sorrel account. Accept gStables for new and existing products/services - boosting local to global commerce. Peer-to-Peer Powered.",
    goal: "$30,000+",
    link: "https://docs.sorrelbanq.org/addons/sorrelpay",
    progress: 5,
    status:0,
  },

  {
    id: 5,
    label: "Sorrel Family Office",
    details: "A service that provides families with comprehensive financial advice and planning. Our Family Office will be able to help families maximize the value of their investments and create a secure financial future. Requires DID integration and TronZ for additional privacy.",
    goal: "TBD",
    link: "https://docs.sorrelbanq.org/addons/family-office",
    progress: 5,
    status:0,
  },
    // Add more dummy addons as needed
  ];

  return (
    <>
    <Navigation></Navigation>
    <div>
      {dummyAddons.map((addon) => (
        <div key={addon.id} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-2">
              <img src={LogoImg} alt={addon.label} className="img-fluid m-4" width="50" />
            </div>
            <div className="col-md-10">
              <div className="card-body">
                <h5 className="card-title">{addon.label}</h5>
                <p className="card-text">{addon.details}</p>
                <a href={addon.link} target="_blank">Learn More</a>
                <p className="card-text">
                  <strong>Goal:</strong> {addon.goal}
                </p>
                <div className="progress">
                  <div className="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${addon.progress}%` }} aria-valuenow={addon.progress} aria-valuemin="0" aria-valuemax="100">
                  </div>
                  <span className="m-auto">{addon.progress}%</span>
                </div>
                <button className="btn btn-lg btn-outline-secondary mt-3 w-100" disabled={addon.status === 0}>Fund</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default AddonsPage;