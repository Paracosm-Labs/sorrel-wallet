import React from 'react';
import Navigation from '../components/navMenu';
import LogoImg from '../img/logo2x.png';

const AddonsPage = () => {
  const dummyAddons = [

  {
    id: 1,
    label: "Sorrel Wallet Cards",
    goal: "$18,000+",
    link: "https://docs.sorrelbanq.org/addons/cards",
    progress: 5,
    status:1,
  },

  {
    id: 2,
    label: "Sorrel AIA Concierge",
    goal: "$18,000+",
    link: "https://docs.sorrelbanq.org/addons/concierge",
    progress: 5,
    status:1,
  },

  {
    id: 3,
    label: "Sorrel Branch Lounges",
    goal: "$18,000+",
    link: "https://docs.sorrelbanq.org/addons/lounges",
    progress: 5,
    status:1,
  },

  {
    id: 4,
    label: "Sorrel Pay",
    goal: "$30,000+",
    link: "https://docs.sorrelbanq.org/addons/sorrelpay",
    progress: 5,
    status:0,
  },

  {
    id: 5,
    label: "Sorrel Family Office",
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
            <div className="col-md-2 col-sm-3">
              <img src={LogoImg} alt={addon.label} className="img-fluid m-4" width="50" />
            </div>
            <div className="col-md-10 col-sm-9">
              <div className="card-body">
                <h5 className="card-title">{addon.label}</h5>
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