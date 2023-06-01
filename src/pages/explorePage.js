import React from 'react';
import Navigation from '../components/navMenu';
import SearchBox from '../components/searchBox';

const ExplorePage = () => {
  // Dummy data for the list of shops
  const shops = [
    { id: 1, username: 'Magical Green', image: 'https://dummyimage.com/350x150/7b8ab8/fff' },
    { id: 2, username: 'Happy Pizza', image: 'https://dummyimage.com/350x150/7b8ab8/fff' },
    { id: 3, username: 'Acme Consumer Products', image: 'https://dummyimage.com/350x150/7b8ab8/fff' },
    { id: 4, username: 'Amazon P2P', image: 'https://dummyimage.com/350x150/7b8ab8/fff' },
  ];

  return (
    <>
    <div className="text-center explore">
    <Navigation></Navigation>
    <SearchBox></SearchBox>
      <div className="row shops">
        {shops.map((shop) => (
          <div className="col mt-3 mb-3 m-auto" key={shop.id}>
            <div className="card shop-card">
              <img src={shop.image} alt={shop.username} className="shop-image" />
              <p className="shop-username pt-2">{shop.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ExplorePage;
