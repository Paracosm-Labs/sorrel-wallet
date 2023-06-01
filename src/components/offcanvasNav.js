import React from 'react';

const OffcanvasNav = () => {
  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNav" aria-labelledby="offcanvasNavLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavLabel">Explore Sorrel</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <section className="mb-4 text-center">
          <div className="align-items-center">
            <img src="https://i.pravatar.cc/64?img=14" alt="Avatar" className="rounded-circle m-3" />
            <h6 className="mb-0">John Doe</h6>
            <p className="badge bg-success p-1"><i className="fa-solid fa-wifi"></i>&nbsp;Connected</p>
          </div>

          <div className="">
            <label htmlFor="countrySelect" className="form-label">Switch Country</label>
            <select className="form-select form-control-lg" id="countrySelect">
              <option value="1">Trinidad & Tobago</option>
              <option value="2">Barbados</option>
              <option value="3">Jamaica</option>
              <option value="4">Dominica</option>
              <option value="5">other countries</option>
            </select>
          </div>
          <hr/>
        </section>
        <section>
          <div className="row">
            <div className="col mt-2">
            
              <a href="/addons">
              <button className="btn btn lg btn-outline-primary w-100" type="button">
                <i className="fa-solid fa-lg fa-puzzle-piece mt-4"></i><p className="text-muted">Addons</p>
              </button>
              </a>


            </div>
            <div className="col mt-2">
              <button className="btn btn lg btn-outline-primary disabled w-100">
                <i className="fa-solid fa-credit-card mt-4 fa-lg"></i><p className="">NFC Card</p>
              </button>
            </div>
            <div className="col mt-2">
              <button className="btn btn lg btn-outline-primary disabled w-100">
                <i className="fa-solid fa-bell-concierge mt-4 fa-lg"></i><p className="">Concierge</p>
              </button>
            </div>
            <div className="col mt-2">
              <button className="btn btn lg btn-outline-primary disabled w-100">
                <i className="fa-solid fa-plus mt-4 fa-lg"></i><p className="">Sorrel Lounges</p>
              </button>
            </div>
            <div className="col mt-2">
              <button className="btn btn lg btn-outline-primary disabled w-100">
                <i className="fa-solid fa-plus mt-4 fa-lg"></i><p className="">Sorrel <br/>Pay</p>
              </button>
            </div>
            <div className="col mt-2">
              <button className="btn btn lg btn-outline-primary disabled w-100">
                <i className="fa-solid fa-plus mt-4 fa-lg"></i><p className="">Family Office</p>
              </button>
            </div>
          </div>
        </section>

        <a href="https://discord.gg/kBtNQ9dtFV" rel="noreferrer" target="_blank">
          <button className="btn btn lg btn-outline-primary w-100 mt-3" type="button">
            <i className="fa-solid fa-xl fa-satellite-dish mt-4"></i><p>Join Community</p>
          </button>
        </a>
        <div className="mt-5 text-center">
          <p className="text-muted">By Paracsom Labs</p>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasNav;
