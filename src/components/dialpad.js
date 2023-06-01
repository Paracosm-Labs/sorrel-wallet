import React, { useState } from 'react';

const Dialpad = ({ onConfirm }) => {
  const [amount, setAmount] = useState('');

  const handleNumberClick = (number) => {
    setAmount(amount + number);
  };

  const handleClearClick = () => {
    setAmount('');
  };

  const handleConfirmClick = () => {
    onConfirm(amount);
    setAmount('');
  };

  const handleSetAmountClick = (presetAmount) => {
    setAmount(presetAmount);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="">
        <h1 className="text-center p-4">
          <small className="text-muted">$</small>
          {amount}
        </h1>
      </div>
        <div className="d-flex mt-3">
          <button className="btn btn-sm btn-outline-secondary mx-1 w-50" onClick={() => handleSetAmountClick('30')}>$30</button>
          <button className="btn btn-sm btn-outline-secondary mx-1 w-50" onClick={() => handleSetAmountClick('60')}>$60</button>
          <button className="btn btn-sm btn-outline-secondary mx-1 w-50" onClick={() => handleSetAmountClick('100')}>$100</button>
          <button className="btn btn-sm btn-outline-secondary mx-1 w-50" onClick={() => handleSetAmountClick('500')}>$500</button>
          <button className="btn btn-sm btn-outline-secondary mx-1 w-50" onClick={() => handleSetAmountClick('1000')}>$1000</button>
        </div>
      <div className="dialpad mt-3 row">
        <div className="d-flex mb-2">
          <button className="btn btn-lg btn-outline-secondary mx-1 w-50" onClick={() => handleNumberClick('1')}>1</button>
          <button className="btn btn-lg btn-outline-secondary mx-1 w-50" onClick={() => handleNumberClick('2')}>2</button>
          <button className="btn btn-lg btn-outline-secondary mx-1 w-50" onClick={() => handleNumberClick('3')}>3</button>
        </div>
        <div className="d-flex mb-2">
          <button className="btn btn-lg btn-outline-secondary mx-1 w-50" onClick={() => handleNumberClick('4')}>4</button>
          <button className="btn btn-lg btn-outline-secondary mx-1 w-50" onClick={() => handleNumberClick('5')}>5</button>
          <button className="btn btn-lg btn-outline-secondary mx-1 w-50" onClick={() => handleNumberClick('6')}>6</button>
        </div>
        <div className="d-flex mb-2">
          <button className="btn btn-lg btn-outline-secondary mx-1 w-50" onClick={() => handleNumberClick('7')}>7</button>
          <button className="btn btn-lg btn-outline-secondary mx-1 w-50" onClick={() => handleNumberClick('8')}>8</button>
          <button className="btn btn-lg btn-outline-secondary mx-1 w-50" onClick={() => handleNumberClick('9')}>9</button>
        </div>
        <div className="d-flex mb-2">
          <button className="btn btn-lg btn-outline-secondary mx-1 w-50" onClick={() => handleNumberClick('0')}>0</button>
          <button className="btn btn-lg btn-outline-secondary mx-1 w-50" onClick={() => handleNumberClick('.')}>.</button>
          <button className="btn btn-lg btn-outline-secondary mx-1 w-50" onClick={() => handleClearClick()}>
            <i className="fa-solid fa-delete-left"></i>
          </button>
        </div>

        <div className="d-flex mt-4">
          <button data-bs-dismiss="offcanvas" className="btn btn-lg btn-primary w-100" onClick={() => handleConfirmClick()} >Confirm {amount}</button>
        </div>
      </div>
    </div>
  );
};

export default Dialpad;
