import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';

const PinPad = ({ showOffcanvas, setShowOffcanvas, offcanvasTitle, pin, setPin, handleOffcanvasSubmit }) => {

  const handlePinChange = (digit) => {
    if (pin.length < 6) {
      setPin(pin + digit);
    }
  };

  const handleOffcanvasClose = () => {
    setShowOffcanvas(false);
    setPin('');
  };

  const handleBiometrics = () => {
    alert("To enable Biometrics please consider crowdfunding an addon.")
  };


  const handleClearPin = () => {
    setPin('');
  };

// Rest of the JSX code for rendering the PinPad component
return (<>
  <div className={`offcanvas pinpad offcanvas-bottom ${showOffcanvas ? 'show' : ''}`} tabIndex="-1" id="offcanvasPinPad" aria-labelledby="offcanvasPinPadLabel">
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offcanvasPinPadLabel">{offcanvasTitle}</h5>
      <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleOffcanvasClose}></button>
    </div>
        <div className="offcanvas-body container">
          <div className="row">
            <div className="col d-none d-md-block d-sm-none"></div>
            <div className="col">
              <div className="row justify-content-between">


                {Array(6).fill().map((_, index) => (
                  <div 
                    key={index} // Add a key prop here
                    id={`pin-${index}`} 
                    className={`col border text-center text-light mx-2 p-3 ${pin[index] ? 'border-success' : 'border-primary'}`}
                  >
                    <h4 className={`text-success m-auto`}>{pin[index] ? '*' : '_'}</h4>
                  </div>
                ))}
              </div>
              <div className="row justify-content-between mt-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
                  <div 
                    key={digit} // And here
                    className="col-4 mt-2"
                  >
                    <button 
                      id={digit} 
                      className="btn btn-outline-secondary btn-lg w-100" 
                      type="button" 
                      onClick={() => handlePinChange(digit)}
                    >
                      {digit}
                    </button>
                  </div>
                ))}

                <div className="col-4 mt-2">
                  <button className="btn btn-outline-secondary btn-lg w-100" type="button" onClick={handleBiometrics}>
                    <i className="fa-solid fa-fingerprint text-success"></i>
                  </button>
                </div>
                <div className="col-4 mt-2">
                  <button className="btn btn-outline-secondary btn-lg w-100" type="button" onClick={handleClearPin}>
                    <i className="fa-solid fa-delete-left"></i>
                  </button>
                </div>
              </div>

                <button className={`btn btn-lg ${offcanvasTitle === "Enter Current PIN" ? `btn-outline-success`:`btn-success`} btn-lg w-100 mt-5`} type="button" onClick={handleOffcanvasSubmit}>
                  {offcanvasTitle === "Enter Current PIN" ? (`Next`):(`Continue`)}
                </button>
            </div>
            <div className="col d-none d-md-block d-sm-none"></div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  </div>
</>);

};

export default PinPad;
