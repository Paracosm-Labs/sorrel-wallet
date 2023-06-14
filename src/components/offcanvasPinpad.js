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
      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleOffcanvasClose}></button>
    </div>
    <div className="offcanvas-body">
      <div className="d-grid gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
          <button key={digit} className="btn btn-lg btn-primary" type="button" onClick={() => handlePinChange(digit)}>
            {digit}
          </button>
        ))}
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-lg btn-danger" type="button" onClick={handleClearPin}>
          Clear
        </button>
        <button className="btn btn-lg btn-success" type="button" onClick={handleOffcanvasSubmit}>
          Submit
        </button>
      </div>
    </div>
  </div>
);

};

export default PinPad;
