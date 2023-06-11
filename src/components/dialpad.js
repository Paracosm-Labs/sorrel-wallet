import React, { useState } from 'react';



const Dialpad = ({ onConfirm, selectedDestination }) => {
  const [amount, setAmount] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleNumberClick = (number) => {
    setAmount(amount + number);
    //     if (selectedAddonsAddress) {
    //   setSelectedAddress(selectedAddonsAddress);
    //   console.log(amount, selectedAddress)
    // }
    console.log(number, selectedDestination)
  };

  const handleClearClick = () => {
    setAmount('');
  };

  const handleConfirmClick = () => {
    onConfirm(amount);
    console.log(amount, selectedDestination)
    setAmount('');
  };

  const handleSetAmountClick = (presetAmount) => {
    setAmount(presetAmount);
    console.log(presetAmount, selectedDestination)
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="mt-3">
        <h1 className="text-center p-3">
          <small className="text-muted">$</small>
          {amount}
        </h1>
      </div>
        <div className="d-flex mt-3">
          <button className="btn btn-md btn-outline-secondary mx-1 w-50" onClick={() => handleSetAmountClick('30')}>$30</button>
          <button className="btn btn-md btn-outline-secondary mx-1 w-50" onClick={() => handleSetAmountClick('60')}>$60</button>
          <button className="btn btn-md btn-outline-secondary mx-1 w-50" onClick={() => handleSetAmountClick('100')}>$100</button>
          <button className="btn btn-md btn-outline-secondary mx-1 w-50" onClick={() => handleSetAmountClick('500')}>$500</button>
          <button className="btn btn-md btn-outline-secondary mx-1 w-50" onClick={() => handleSetAmountClick('1000')}>$1000</button>
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
          <button data-bs-dismiss="offcanvas" className="btn btn-lg btn-success w-100 p-2" onClick={() => handleConfirmClick()} >Confirm {amount}</button>
        
        </div>
      </div>
    </div>
  );
};

export default Dialpad;
