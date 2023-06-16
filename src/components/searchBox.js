import React from 'react';

const SearchBox = () => {
  return (
<div className="search-box">
<div className="card">
<h5 className="text-center mt-3">Discover what's in your area</h5>
  <div className="d-none">
    <h6 className="text-center mt-3">Discover what's in your area</h6>
    <div className="input-group px-4 mt-3">
      <input type="text" className="form-control form-control-lg" placeholder="Search..." />
    </div>
      <button className="btn btn-outline-secondary w-50 mt-3 m-auto">Discover</button>
    
    </div>
    </div>
    </div>

  );
};

export default SearchBox;
