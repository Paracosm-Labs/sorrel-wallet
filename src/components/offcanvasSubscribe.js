import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';

const OffcanvasSubscribe = ({ shopId, shopName, shopPic }) => {
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

  const handleSubscribe = () => {
    // Process subscription logic
    toast.success(`Subscribed to ${selectedPlan.name} from ${shopName}!`, {
      icon: ({ theme, type }) => <img src={LogoImg} className="rounded-circle me-5" height="24" />,
      theme: 'dark',
    });
    console.log(`Subscribed to ${selectedPlan.name} from ${shopName}`);
  };

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasSubscribe" aria-labelledby="offcanvasSubscribeLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasSubscribeLabel">Subscribe</h5>
        <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body m-2">
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
          <button  data-bs-dismiss="offcanvas" className="btn btn-lg btn-success w-100 p-2" type="button" onClick={handleSubscribe}>
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasSubscribe;
