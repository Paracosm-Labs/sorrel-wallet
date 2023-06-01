import React from 'react';

const ShopProfile = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="profile-section">
            <img
              src="https://dummyimage.com/42x42/000000/fff&text=Shop+Logo"
              alt="Shop Logo"
              className="profile-logo"
            />
            <h3 className="profile-username">Gourmet Foods</h3>
            <p className="profile-bio">We deliver to you!</p>
          </div>
        </div>
        <div className="col-md-8">
          <div className="profile-section">
            <div className="profile-gallery">
              <img
                src="https://dummyimage.com/250x100/000000/fff&text=Post+1"
                alt="Post 1"
                className="profile-post m-3"
              />
              <img
                src="https://dummyimage.com/250x100/000000/fff&text=Post+2"
                alt="Post 2"
                className="profile-post m-3"
              />
              <img
                src="https://dummyimage.com/250x100/000000/fff&text=Post+3"
                alt="Post 3"
                className="profile-post m-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;
