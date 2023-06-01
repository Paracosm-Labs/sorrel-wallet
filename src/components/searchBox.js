import React from 'react';

const SearchBox = () => {
  return (
<div className="search-box">
<div className="card">
    <h6 className="text-center mt-3">Discover what's in your area</h6>
    <div className="input-group px-4 mt-3">
      <input type="text" className="form-control form-control-lg" placeholder="Search..." />
    </div>
      <button className="btn btn-lg btn-outline-secondary">Discover</button>
    </div>
    </div>

  );
};

export default SearchBox;
