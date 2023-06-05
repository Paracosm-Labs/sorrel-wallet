import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';

const OffcanvasBuy = ({ shopId, shopName, shopPic }) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(1);

  const handleAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setOrderQuantity(parseInt(event.target.value));
  };

  const handleConfirmOrder = () => {
    // Process order with the selected details
    toast.success(`Order confirmed for ${orderQuantity} item(s) from ${shopName} with delivery to ${deliveryAddress}`, {
      icon: ({ theme, type }) => <img src={LogoImg} className="rounded-circle me-5" height="24" />,
      theme: 'dark',
    });
    console.log(`Order confirmed: ${orderQuantity} item(s) from ${shopName}, Delivery Address: ${deliveryAddress}`);
  };

  return (
    <>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasBuy" aria-labelledby="offcanvasBuyLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasBuyLabel">Buy Now</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex align-items-center mb-3">
            <img src={shopPic} alt={shopName} className="rounded-circle me-3" width="50" height="50" />
            <h6>{shopName}</h6>
          </div>
          <div className="mb-3">
            <label htmlFor="addressSelect" className="form-label">Delivery Address</label>
            <select className="form-select" id="addressSelect" value={deliveryAddress} onChange={handleAddressChange}>
              <option value="">Select Address</option>
              <option value="home">Home</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="quantityInput" className="form-label">Quantity</label>
            <input type="number" className="form-control" id="quantityInput" value={orderQuantity} onChange={handleQuantityChange} />
          </div>
          <div className="text-center">
            {/* Display order details and total */}
          </div>
          <div className="text-center">
            <button className="btn btn-lg btn-success w-100" onClick={handleConfirmOrder}>Confirm Order</button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
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
