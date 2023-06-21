import React, { useState } from 'react';
import Navigation from '../components/navMenu';
import SearchBox from '../components/searchBox';
import OffcanvasBuy from '../components/offcanvasBuy';
import OffcanvasSubscribe from '../components/offcanvasSubscribe';

const ExplorePage = () => {
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [selectedShopName, setSelectedShopName] = useState('');
  const [selectedShopPic, setSelectedShopPic] = useState('');

  // Dummy data for the list of shops
  const shops = [
    { id: 1, username: 'Food & Entertainment', image: 'https://media.discordapp.net/attachments/1061348902252597368/1113937679789338644/wescosmic_table_of_consumer_products_for_instagram_0_d75d5b92-5939-44f0-9139-850581ecbaf8.png?width=350&height=180' },
    { id: 2, username: 'Products & Services', image: 'https://media.discordapp.net/attachments/1061348902252597368/1113937981301076078/wescosmic_consumer_electronics_in_packaging_for_instagram_2_87e17f12-6521-480c-9039-d7d418133cc8.png?width=350&height=180' },
    { id: 3, username: 'Travel & Experiences', image: 'https://media.discordapp.net/attachments/1061348902252597368/1113933972314009610/wescosmic_caribbean_travel_experiences_for_instagram_0_131b0149-9c3d-420f-b140-b9dca00e80f3.png?width=350&height=180' },
    { id: 4, username: 'Courses & Learning', image: 'https://media.discordapp.net/attachments/1061348902252597368/1115385822343069706/wescosmic_smart_online_classroom_for_university_students_future_e568a396-ea0d-4a3f-8b65-7ec3cfe82931.png?width=350&height=180' },
    { id: 5, username: 'Positive Social Impact', image: 'https://media.discordapp.net/attachments/1061348902252597368/1113936393211760660/wescosmic_people_doing_social_good_in_community_and_nature_caus_bcbd483f-47c4-4a60-a0ee-1c7ba704e1d4.png?width=350&height=180' },
  ];

  const handleBuyClick = (id, name, pic) => {
    setSelectedShopId(id);
    setSelectedShopName(name);
    setSelectedShopPic(pic);
  };

  const handleSubscribeClick = (id, name, pic) => {
    setSelectedShopId(id);
    setSelectedShopName(name);
    setSelectedShopPic(pic);
  };

  return (
    <>
      <div className="text-center explore">
        <Navigation />
        <SearchBox />
        <div className="shops mt-3">
        <div className="row mt-3 m-auto">
          {shops.map((shop) => (
            <div className="col-6  mt-4" key={shop.id}>
              <div className="card shop-card">
                <img src={shop.image} alt={shop.username} className="shop-image" />
                <p className="shop-username p-2">{shop.username}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
        <div  className="actions mt-4 mb-4">
        <div  className="row actions mt-3 m-auto">
        <div  className="col">
                <button
                  className="btn btn-outline-success w-100"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBuy"
                  aria-controls="offcanvasBuy"
                  onClick={() => handleBuyClick(1, "Food & Entertainment", "https://media.discordapp.net/attachments/1061348902252597368/1113937679789338644/wescosmic_table_of_consumer_products_for_instagram_0_d75d5b92-5939-44f0-9139-850581ecbaf8.png?width=350&height=180")}
                >
                  Buy Now<br/><small>Demo</small>
                </button>
        </div>
        <div  className="col">
                <button
                  className="btn btn-outline-success  w-100"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasSubscribe"
                  aria-controls="offcanvasSubscribe"
                  onClick={() => handleSubscribeClick(1, "Food & Entertainment", "https://media.discordapp.net/attachments/1061348902252597368/1113937679789338644/wescosmic_table_of_consumer_products_for_instagram_0_d75d5b92-5939-44f0-9139-850581ecbaf8.png?width=350&height=180")}
                >
                  Subscribe<br/><small>Demo</small>
                </button>
          </div>
        </div>
        </div>
      </div>
      <OffcanvasBuy shopId={selectedShopId} shopName={selectedShopName} shopPic={selectedShopPic} />
      <OffcanvasSubscribe shopId={selectedShopId} shopName={selectedShopName} shopPic={selectedShopPic} />
    </>
  );
};

export default ExplorePage;
