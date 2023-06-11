import React from 'react';

const PromoSlide = () => {
  return (<>
    <div className="mt-4">
<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
    <a href="/cards">
      <img src="/img/cards-mockup.jpg" className="d-block w-100" width="380" height="220" alt=""/>
      <div className="carousel-caption bg-primary">Coming Soon!
      </div>
    </a>
    </div>
    <div className="carousel-item">
    <a href="/earn">
      <img src="/img/earn-yield.jpg" className="d-block w-100" width="380" height="220" alt=""/>
      <div className="carousel-caption bg-primary">Earn Base <span className="text-success">2% APR</span> and more!
      </div>
    </a>
    </div>
    <div className="carousel-item">
    <a href="/addons">
      <img src="/img/jes-concierge.jpg" className="d-block w-100" width="380" height="220" alt=""/>
      <div className="carousel-caption bg-primary">Hi I'm Jes, Your Sorrel Concierge
      </div>
    </a>
    </div>
    <div className="carousel-item">
      <a href="/addons">
        <img src="/img/crowdfund.jpg" className="d-block w-100" width="380" height="220" alt=""/>
        <div className="carousel-caption bg-primary">Crowdfund addons to enhance your Sorrel Experience
        </div>
      </a>
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
