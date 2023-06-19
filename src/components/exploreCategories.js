import React, { useState } from 'react';
import OffcanvasBuy from '../components/offcanvasBuy';

const ExploreCategories = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selectedProductPic, setSelectedProductPic] = useState('');

  const products = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    image: `https://dummyimage.com/200x200/000/fff&text=Product+${i + 1}`,
    price: (i + 1) * 10,
  }));

  const handleBuyClick = (id, name, pic) => {
    setSelectedProductId(id);
    setSelectedProductName(name);
    setSelectedProductPic(pic);
  };

  return (
    <>
      <div className="text-center shop">
        <Navigation />
        <SearchBox />
        <div className="row products mt-3">
          {products.map((product) => (
            <div className="col-md-4 mt-3 mb-3" key={product.id}>
              <div className="card product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <p className="product-name pt-2">{product.name}</p>
                <p className="product-price">${product.price}</p>
                <button
                  className="btn btn-outline-success m-3 mt-2"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBuy"
                  aria-controls="offcanvasBuy"
                  onClick={() => handleBuyClick(product.id, product.name, product.image)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <OffcanvasBuy productId={selectedProductId} productName={selectedProductName} productPic={selectedProductPic} />
    </>
  );
};

export default ExploreCategories;
