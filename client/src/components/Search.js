import React from "react";

const Search = ({ setSearchMake, setSearchModel }) => {
  const handleMakeChange = (event) => {
    setSearchMake(event.target.value);
  };

  const handleModelChange = (event) => {
    setSearchModel(event.target.value);
  };

  return (
    <div>
      <select onChange={handleMakeChange}>
        <option value="">All</option>
        <option value="make">Make</option>
        <option value="model">Model</option>
      </select>
      <input type="text" placeholder="Search..." onChange={handleModelChange} />
    </div>
  );
};

export default Search;