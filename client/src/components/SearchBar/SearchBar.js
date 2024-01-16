import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import grayX from '../../images/gray-x.png'
import search from '../../images/search.png'

const SearchBar = (props) => {
  const navigate = useNavigate();
  const [searchBarText, setSearchBarText] = useState("");

  const handleChange = (e) => {
    setSearchBarText(e.target.value);
  };

  const handleSubmit = async () => {
    if (searchBarText === "") {
      alert("Search bar can not be empty");
    } else {
      navigate(`/products/0?search=${searchBarText.toLowerCase()}`);
      setSearchBarText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const clearText = () => {
    setSearchBarText("");
  };

  return (
    <div id="search-bar" data-testid="searchbar">
      <input
        type="text"
        id="search-text"
        name="search"
        value={searchBarText}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
      ></input>
      <button
        id="search-button"
        data-testid="searchbar-button"
        onClick={handleSubmit}
        style={{backgroundImage: `url(${search})`}}
      />
      {searchBarText !== "" && <button id="clear-button" style={{backgroundImage: `url(${grayX})`}} onClick={clearText} />}
    </div>
  );
};

export default SearchBar;
