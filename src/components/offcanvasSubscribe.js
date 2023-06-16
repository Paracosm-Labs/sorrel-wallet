import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';
import OffcanvasPinpad from './offcanvasPinpad';
import { WalletContext } from '../context/walletContext';

const OffcanvasSubscribe = ({ shopId, shopName, shopPic }) => {
  const [sendAmount, setSendAmount] = useState('');
  const [pin, setPin] = useState('');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [closeTransferPane, setCloseTransferPane] = useState(null);
  const [offcanvasTitle, setOffcanvasTitle] = useState('');
  const walletContext = useContext(WalletContext);

  const selectedPlan = {
    name: 'Premium Plan',
    price: '$12.00/month',
    description: 'Unlock premium features and exclusive content.',
    features: [
      'Ad-free experience',
      'Unlimited access to all content',
      'Priority customer support',
      'Exclusive member perks',
    ],
  };


  const handlePinConfirmation = (amount) => {
    setOffcanvasTitle('Enter PIN to Confirm');
    // setSendAmount(amount);
    setShowOffcanvas(true);
    // alert("yea");
  }

  const resetPane  = () => {
    setCloseTransferPane(false);
    setPin(``);
  }


  const confirmPin  = (data) => {
    setPin(data)
  }


  const handleConfirmSubscribe = () => {
    // Process subscription logic
    if (walletContext.walletData) {

      if (walletContext.checkPIN(pin)) { // Check the pin before proceeding
          setShowOffcanvas(false)
          setCloseTransferPane(true);

          toast.success(`Subscribed to ${selectedPlan.name} from ${shopName}!`, {
            icon: ({ theme, type }) => <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24" />,
            theme: 'dark',
          });
          console.log(`Subscribed to ${selectedPlan.name} from ${shopName}`);
      }
      else {
          setPin('');
          alert(`invalid PIN.`);
          return;
        }
      } else {
       //demo mode if there is no wallet loaded
        const  validPin = '000000';
        const isValidPin = (pin  === validPin);
        if (isValidPin) {

          setShowOffcanvas(false)
          setCloseTransferPane(true);

          toast.success(`Subscribed to ${selectedPlan.name} from ${shopName}!`, {
            icon: ({ theme, type }) => <img src={LogoImg} alt="Logo" className="rounded-circle me-5" height="24" />,
            theme: 'dark',
          });
          console.log(`Subscribed to ${selectedPlan.name} from ${shopName}`);
        }
        else {
          // show error message
          setPin('');
          alert(`invalid PIN!! Use test pin: ${validPin}`);
        }

    }

  };

  return (<>
    <div className="offcanvas subscribe offcanvas-end" tabIndex="-1" id="offcanvasSubscribe" aria-labelledby="offcanvasSubscribeLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasSubscribeLabel">Subscribe</h5>
        <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div className="offcanvas-body m-2">
      {!closeTransferPane ? (<>
        <div className="justify-content-center mb-5">
          <img src={shopPic} alt={shopName} className="rounded-circle" width="50" height="50" />
            <div className="text-center">
              <p>{shopName}</p>
            </div>
        </div>

        <p className="text-center">{selectedPlan.description}</p>
        <ul className="list-group mb-3">
          {selectedPlan.features.map((feature, index) => (
            <li key={index} className="list-group-item">
              {feature}
            </li>
          ))}
        </ul>
        <h6 className="text-center">{selectedPlan.name}</h6>
        <h5 className="text-center">{selectedPlan.price}</h5>
        <div className="text-center mt-5">
          <button  className="btn btn-lg btn-success w-100 p-2" type="button" onClick={handlePinConfirmation}>
            Subscribe Now
          </button>
        </div>
          </>):(
          <>
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
        handleOffcanvasSubmit={handleConfirmSubscribe} 
      />
      </>
  );
};

export default OffcanvasSubscribe;
