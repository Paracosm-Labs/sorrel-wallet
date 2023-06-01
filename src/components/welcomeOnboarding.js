import React  from 'react';

const WelcomeOnboarding = () => {

  return (

    <>
	<div className="onboarding">
	<div className="skipper text-end mt-3 mx-3"><a href="/wallet">Skip</a></div>
		<div id="homeCarousel" className="carousel carousel-light slide" data-bs-ride="carousel">
		  <div className="carousel-indicators">
		    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
		    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 1"></button>
		    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 2"></button>
		    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="3" aria-label="Slide 3"></button>
		    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="4" aria-label="Slide 4"></button>
		    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="5" aria-label="Slide 5"></button>
		  </div>
		  <div className="carousel-inner">
		    <div className="carousel-item active" data-bs-interval="10000">

		      <img src="https://dummyimage.com/420x800/242435/fff"/>
		      <div className="carousel-caption">
		        <h5>Earn a steady APR interest in stablecoins on your assets. Interest is credited monthly to your<br/>Sorrel Savings Account.<br/>Withdraw your assets at anytime.</h5>

				  <button className="btn btn-lg btn-outline-success w-100 mt-3 mb-3" type="button"  data-bs-target="#homeCarousel" data-bs-slide="next">
				    Next&nbsp;&nbsp;>
				  </button>

		      </div>

		    </div>
		    <div className="carousel-item" data-bs-interval="10000">

		      <img src="https://dummyimage.com/420x800/242435/fff"/>
		      <div className="carousel-caption">
		        <h5>Earn a steady APR interest in stablecoins by<br/>staking your assets for fixed periods in<br/>Sorrel Vaults.<br/>Interest is credited monthly to your <br/>Sorrel Savings Account.</h5>

				  <button className="btn btn-lg btn-outline-success w-100 mt-3 mb-3" type="button"  data-bs-target="#homeCarousel" data-bs-slide="next">
				    Next&nbsp;&nbsp;>
				  </button>

		      </div>

		    </div>
		    <div className="carousel-item" data-bs-interval="10000">

		      <img src="https://dummyimage.com/420x800/242435/fff"/>
		      <div className="carousel-caption">
		        <h5>Bridge your stablecoins into the real world<br/>via various available off-ramp methods.</h5>

				  <button className="btn btn-lg btn-outline-success w-100 mt-3 mb-3" type="button"  data-bs-target="#homeCarousel" data-bs-slide="next">
				    Next&nbsp;&nbsp;>
				  </button>

		      </div>

		    </div>
		    <div className="carousel-item" data-bs-interval="10000">

		      <img src="https://dummyimage.com/420x800/242435/fff"/>
		      <div className="carousel-caption">
		        <h3>Coming Soon</h3>
		        <h5>Access a low interest credit limit using your Sorrel Savings Accounts and Vaults as collateral.</h5>

				  <button className="btn btn-lg btn-outline-success w-100 mt-3 mb-3" type="button"  data-bs-target="#homeCarousel" data-bs-slide="next">
				    Next&nbsp;&nbsp;>
				  </button>

		      </div>
		    

		    </div>

				<div className="carousel-item" data-bs-interval="50000">

				    <img src="https://dummyimage.com/420x800/242435/fff"/>
				      <div className="carousel-caption pb-5">
				        <h5>Get Started Here</h5>

				        <div className="d-grid gap-3 mt-3">
				        
				          <button className="btn btn-lg btn-outline-success w-100" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
				            <i className="fab fa-google me-2"></i>Sign in with Google
				          </button>
				        
				        
				          <button className="btn btn-lg btn-outline-success w-100" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
				            <i className="fab fa-telegram-plane me-2"></i>Sign in with Telegram
				          </button>
				        
				        
				          <button className="btn btn-lg btn-outline-success w-100" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
				            <i className="fas fa-fingerprint me-2"></i>Sign in with Biometrics
				          </button>
				        
				        
				          <button className="btn btn-lg btn-outline-success w-100" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
				            <i className="fas fa-credit-card me-2"></i>via NFC Wallet Card
				          </button>
				        
				        </div>

				  </div>
				</div>


		    <div className="carousel-item" data-bs-interval="50000">

		      	<img src="https://dummyimage.com/420x800/242435/fff"/>

			      <div className="carousel-caption">
			        
				    <h5>Your New Sorrel Account Awaits!</h5>

				    <div className="p-1 mt-5">
				      	<h6 className="text-left">Select Your Home Country</h6>
				        <select className="mt-3 form-select" aria-label="Select Country">
				          <option selected>Trinidad & Tobago</option>
				          <option value="1">Barbados</option>
				          <option value="2">Jamaica</option>
				          <option value="3">Dominica</option>
				          <option value="4">other countries</option>
				        </select>
				    </div>

					  <a href="/wallet"> <button className="btn btn-lg btn-outline-success w-100 mt-5 mb-3" type="button" >
					   Create Account
					  </button></a>

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

export default WelcomeOnboarding;
