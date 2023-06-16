import React, { useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';
import OffcanvasPinpad from './offcanvasPinpad';
import { WalletContext } from '../context/walletContext';

const OffcanvasBuy = ({ shopId, shopName, shopPic }) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [pin, setPin] = useState('');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [closeTransferPane, setCloseTransferPane] = useState(null);
  const [offcanvasTitle, setOffcanvasTitle] = useState('');
  const walletContext = useContext(WalletContext);

  const handleAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setOrderQuantity(parseInt(event.target.value));
  };


  const handlePinConfirmation = (amount) => {
    setOffcanvasTitle('Enter PIN to Confirm');
    setShowOffcanvas(true);
  }

  const resetPane  = () => {
    setCloseTransferPane(false);
    setPin(``);
  }


  const confirmPin  = (data) => {
    setPin(data)
  }



  const handleConfirmOrder = () => {

    if (walletContext.walletData) {

      if (walletContext.checkPIN(pin)) { // Check the pin before proceeding
            setShowOffcanvas(false)
            setCloseTransferPane(true);

            // Process order with the selected details
            toast.success(`Order confirmed for ${orderQuantity} item(s) from ${shopName} delivering to ${deliveryAddress}`, {
              icon: ({ theme, type }) => <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24" />,
              theme: 'dark',
            });
            console.log(`Order confirmed: ${orderQuantity} item(s) from ${shopName}, Delivery Address: ${deliveryAddress}`);
      }

      else {
        setPin('');
        alert(`invalid PIN.`);
        return;
      }
      
      } else  {
          //demo mode if there is no wallet loaded
          const  validPin = '000000';
          const isValidPin = (pin  === validPin);
          if (isValidPin) {

            setShowOffcanvas(false)
            setCloseTransferPane(true);

            // Process order with the selected details
            toast.success(`Order confirmed for ${orderQuantity} item(s) from ${shopName} delivering to ${deliveryAddress}`, {
              icon: ({ theme, type }) => <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24" />,
              theme: 'dark',
            });
            console.log(`Order confirmed: ${orderQuantity} item(s) from ${shopName}, Delivery Address: ${deliveryAddress}`);
          }
          else {
            // show error message
            setPin('');
            alert(`invalid PIN!! Use test pin: ${validPin}`);
          } 

      }

  };

  return (
    <>
      <div className="offcanvas buy-now offcanvas-end" tabIndex="-1" id="offcanvasBuy" aria-labelledby="offcanvasBuyLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasBuyLabel">Order Now</h5>
          <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        
          <div className="offcanvas-body m-2">
          {!closeTransferPane ? (<>
            <div className="mb-5  justify-content-center text-center">
              <img src={shopPic} alt={shopName} className="rounded-circle" width="50" height="50" />
              <div className="text-center">
                <p>{shopName}</p>
              </div>
            </div>
            <div className="mb-3">
              <div className="text-white">
                <h6 className="text-start">Order Summary</h6>
                <div className="row">
                <div className="col-6 text-start">
                  <p className="text-muted">2 x NFC Cards</p>
                </div>
                <div className="col-6 text-end">
                  <p className="text-muted">$80.00</p>
                </div>
                <div className="col-12 text-center">
                  
                  <h4>Total: $80.00</h4>
                </div>
                </div>
                
              </div>
            </div>
            <div className="mt-5 mb-3 text-start">
              <label htmlFor="addressSelect" className="form-label">Delivery Address</label>
              <select className="form-select" id="addressSelect" value={deliveryAddress} onChange={handleAddressChange}>
                <option value="">Select Address</option>
                <option value="home">Home</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="quantityInput" className="form-label">Quantity</label>
              <input type="number" className="form-control" id="quantityInput" value={orderQuantity} onChange={handleQuantityChange} />
            </div>
            <div className="text-center">
              {/* Display order details and total */}
            </div>
            <div className="text-center mt-5">
              <button className="btn btn-lg btn-success w-100 p-2" onClick={handlePinConfirmation}>Confirm Order</button>
            </div>
          </>):(<>

          <div className="text-center m-5"><i className="fa fa-solid fa-circle-check fa-lg text-success"></i></div>
          <button onClick={resetPane} type="button" className={`mt-5 btn btn-lg w-100 btn-success`} data-bs-dismiss="offcanvas">
            Finish
          </button>

          </>)}            
          </div>



      </div>
      <OffcanvasPinpad 
        showOffcanvas={showOffcanvas} 
        setShowOffcanvas={setShowOffcanvas} 
        offcanvasTitle={offcanvasTitle} 
        pin={pin}
        setPin={confirmPin}
        handleOffcanvasSubmit={handleConfirmOrder} 
      />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default OffcanvasBuy;
