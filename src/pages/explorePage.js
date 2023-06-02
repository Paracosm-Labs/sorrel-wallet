import React from 'react';
import Navigation from '../components/navMenu';
import SearchBox from '../components/searchBox';

const ExplorePage = () => {
  // Dummy data for the list of shops
  const shops = [
    { id: 1, username: 'Food & Entertainment', image: 'https://media.discordapp.net/attachments/1061348902252597368/1113937679789338644/wescosmic_table_of_consumer_products_for_instagram_0_d75d5b92-5939-44f0-9139-850581ecbaf8.png?width=350&height=180' },
    { id: 2, username: 'Products & Services', image: 'https://media.discordapp.net/attachments/1061348902252597368/1113937981301076078/wescosmic_consumer_electronics_in_packaging_for_instagram_2_87e17f12-6521-480c-9039-d7d418133cc8.png?width=350&height=180' },
    { id: 3, username: 'Travel & Experiences', image: 'https://media.discordapp.net/attachments/1061348902252597368/1113933972314009610/wescosmic_caribbean_travel_experiences_for_instagram_0_131b0149-9c3d-420f-b140-b9dca00e80f3.png?width=350&height=180' },
    { id: 4, username: 'Positive Social Impact', image: 'https://media.discordapp.net/attachments/1061348902252597368/1113936393211760660/wescosmic_people_doing_social_good_in_community_and_nature_caus_bcbd483f-47c4-4a60-a0ee-1c7ba704e1d4.png?width=350&height=180' },
  ];

  return (
    <>
    <div className="text-center explore">
    <Navigation></Navigation>
    <SearchBox></SearchBox>
      <div className="row shops mt-3">
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
