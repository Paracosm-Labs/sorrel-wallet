import React  from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import RingLoader from "react-spinners/RingLoader";

const redirectToURL = (url) => {
  window.location.href = url;
};

const WelcomeOnboarding = () => {

  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();

  if (isAuthenticated) {
    return redirectToURL('/welcome');
  };

  if (isLoading) {
    return (
    	<div className="spinner-container">
				<RingLoader color="#109e77" size={100} />
			</div>
		);
  }

  if (error) {
    return <div><h1>Oops... {error.message}</h1></div>;
  }
  else{

  return (

    <>
	<div className="onboarding">
	<div className="skipper position-fixed text-end mt-3 mx-3"><a href="#" data-bs-target="#homeCarousel" data-bs-slide-to="4" aria-label="Slide 4">Skip</a></div>
		<div id="homeCarousel" className="carousel carousel-light slide" data-bs-ride="carousel">
		  <div className="carousel-indicators">
		    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
		    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 1"></button>
		    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 2"></button>
		    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="3" aria-label="Slide 3"></button>
		    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="4" aria-label="Slide 4"></button>
		  </div>
		  <div className="carousel-inner">
		    <div className="carousel-item active" data-bs-interval="10000">

		      <img src="/img/onboard6.jpg" className="d-block mx-auto w-100" width="420" height="800"/>
		      <div className="carousel-caption">
				  <button className="btn btn-lg btn-outline-success w-100 mt-3 mb-3" type="button"  data-bs-target="#homeCarousel" data-bs-slide="next">
				    Get Started&nbsp;&nbsp;>
				  </button>

		      </div>

		    </div>
		    <div className="carousel-item" data-bs-interval="10000">

		      <img src="/img/onboard2.jpg" className="d-block mx-auto w-100" width="420" height="800"/>
		      <div className="carousel-caption">
		        <h5>Earn a steady APR interest, credited monthly to your<br/> Sorrel account</h5>

				  <button className="btn btn-lg btn-outline-success w-100 mt-3 mb-3" type="button"  data-bs-target="#homeCarousel" data-bs-slide="next">
				    Next&nbsp;&nbsp;>
				  </button>

		      </div>

		    </div>
		    <div className="carousel-item" data-bs-interval="10000">

		      <img src="/img/onboard3.jpg" className="d-block mx-auto w-100" width="420" height="800"/>
		      <div className="carousel-caption">
		        <h5>Jes, Your Sorrel Concierge will be available to assist you 24/7</h5>

				  <button className="btn btn-lg btn-outline-success w-100 mt-3 mb-3" type="button"  data-bs-target="#homeCarousel" data-bs-slide="next">
				    Next&nbsp;&nbsp;>
				  </button>

		      </div>

		    </div>
		    <div className="carousel-item" data-bs-interval="10000">

		      <img src="/img/onboard4b.jpg" className="d-block mx-auto w-100" width="420" height="800"/>
		      <div className="carousel-caption">
		        <h3>Coming Soon</h3>
		        <h5>Wallet NFC Cards and zero to low interest credit facility</h5>

				  <button className="btn btn-lg btn-outline-success w-100 mt-3 mb-3" type="button"  data-bs-target="#homeCarousel" data-bs-slide="next">
				    Next&nbsp;&nbsp;>
				  </button>

		      </div>
		    

		    </div>

				<div className="carousel-item" data-bs-interval="50000">

				    <img src="/img/onboard5.jpg" className="d-block mx-auto w-100" width="420" height="800"/>
				      <div className="carousel-caption pb-5">
				        <h5>Get Started Here</h5>

				        <div className="d-grid gap-3 mt-3">
				        
				          <button onClick={() => loginWithRedirect()} className="btn btn-lg btn-outline-success w-100" type="button">
				            <i className="fa-solid fa-user-plus me-2"></i>Signup | Login
				          </button>

				        
				          <button className="btn btn-lg btn-outline-success w-100 disabled" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
				            <i className="fas fa-credit-card me-2"></i>Login via NFC Card<br/><small>Coming Soon</small>
				          </button>
				        
				        </div>

				  </div>
				</div>


		  </div>
		  <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
		    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
		    <span className="visually-hidden">Previous</span>
		  </button>
		  <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
		    <span className="carousel-control-next-icon" aria-hidden="true"></span>
		    <span className="visually-hidden">Next</span>
		  </button>
		</div>


		</div>

    </>

  );
	};
};

export default WelcomeOnboarding;