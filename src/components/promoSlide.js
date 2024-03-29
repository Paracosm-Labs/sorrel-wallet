import React from 'react';
import { Link } from 'react-router-dom';

const PromoSlide = () => {
  return (<>
    <div className="mt-4">
<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 2"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
    <Link to="/cards">
      <img src="/img/cards-mockup.jpg" className="d-block w-100" width="380" height="220" alt=""/>
      <div className="carousel-caption bg-primary">Get yours today!
      </div>
    </Link>
    </div>

    <div className="carousel-item">
    <Link to="/addons">
      <img src="/img/jes-concierge.jpg" className="d-block w-100" width="380" height="220" alt=""/>
      <div className="carousel-caption bg-primary">Hi I'm Jes, Your Sorrel Concierge
      </div>
    </Link>
    </div>
    <div className="carousel-item">
      <Link to="/addons">
        <img src="/img/crowdfund.jpg" className="d-block w-100" width="380" height="220" alt=""/>
        <div className="carousel-caption bg-primary">Crowdfund addons to enhance your Sorrel Experience
        </div>
      </Link>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
    </>
  );
};

export default PromoSlide;
