import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';

const PinPad = ({ onPinSubmit, offcanvasTitle }) => {
  const [pin, setPin] = useState('');
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handlePinChange = (digit) => {
    if (pin.length < 6) {
      setPin(pin + digit);
    }
  };

  const handleOffcanvasClose = () => {
    setShowOffcanvas(false);
    setPin('');
  };

  const handleOffcanvasSubmit = () => {
    if (pin.length !== 6) {
      toast.warning(`PIN must be 6 digits`, {
        icon: ({theme, type}) => <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24"/>,
        theme: "dark",
      });
      return;
    }
    onPinSubmit(pin);
    setShowOffcanvas(false);
    setPin('');
  };

  const handleClearPin = () => {
    setPin('');
  };

// Rest of the JSX code for rendering the PinPad component
return (
  <div className="offcanvas pinpad offcanvas-bottom" tabIndex="-1" id="offcanvasPinPad" aria-labelledby="offcanvasPinPadLabel">
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offcanvasPinPadLabel">{offcanvasTitle}</h5>
      <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleOffcanvasClose}></button>
    </div>
        <div className="offcanvas-body container">
          <div className="row">
            <div className="col d-none d-md-block d-sm-none"></div>
            <div className="col">
              <div className="row justify-content-between">

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
                  <div className="col-4 mt-2">
                    <button key={digit} className="btn btn-outline-secondary btn-lg w-100" type="button" onClick={() => handlePinChange(digit)}>
                      {digit}
                    </button>
                  </div>
                ))}
                <div className="col-4 mt-2">
                  <button className="btn btn-outline-secondary btn-lg w-100" type="button" onClick={handleClearPin}>
                    <i className="fa-solid fa-delete-left"></i>
                  </button>
                </div>
              </div>

                <button className="btn btn-lg btn-success btn-lg w-100 mt-5" type="button" onClick={handleOffcanvasSubmit}>
                  Continue
                </button>
            </div>
            <div className="col d-none d-md-block d-sm-none"></div>
      </div>

    </div>
  </div>
);

};

export default PinPad;
