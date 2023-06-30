import React from "react";

const Search = ({ setSearchMake, setSearchModel }) => {
  const handleMakeChange = (event) => {
    setSearchMake(event.target.value);
  };

  const handleModelChange = (event) => {
    setSearchModel(event.target.value);
  };

  return (
    <div className="search">
      <select onChange={handleMakeChange}>
        <option className='button' value="make">Make</option>
        <option className='button' value="model">Model</option>
      </select>
      <input className='search-input' type="text" placeholder="Search..." onChange={handleModelChange} />
    </div>
  );
};

export default Search;