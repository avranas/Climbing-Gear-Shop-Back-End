import React from 'react';
import { Link } from "react-router-dom";
import shoesPic from "../../images/shoes.webp";
import harnessPic from "../../images/harness.webp";
import ropePic from "../../images/rope.webp";
import carabinerPic from "../../images/carabiner.webp";
import chalkPic from "../../images/chalk.webp";
import "./CategoryList.css";

const CategoryList = (props) => {
  const linkStyle = {
    color: "rgb(48, 53, 73)",
    textDecoration: "none",
  };

  return (
    <section
      id="category-list"
      className="container d-flex justify-content-around flex-wrap"
    >
      <Link to="/products/0?category=shoes" style={linkStyle}>
        <div className="category-box styled-box styled-link-box">
          <img src={shoesPic} alt="shop shoes" />
          <p>Shoes</p>
        </div>
      </Link>
      <Link to="/products/0?category=harnesses" style={linkStyle}>
        <div className="category-box styled-box styled-link-box">
          <img src={harnessPic} alt="shop harnesses" />
          <p>Harnesses</p>
        </div>
      </Link>
      <Link to="/products/0?category=ropes" style={linkStyle}>
        <div className="category-box styled-box styled-link-box">
          <img src={ropePic} alt="shop ropes" />
          <p>Ropes</p>
        </div>
      </Link>
      <Link to="/products/0?category=hardware" style={linkStyle}>
        <div className="category-box styled-box styled-link-box">
          <img src={carabinerPic} alt="shop hardware" />
          <p>Hardware</p>
        </div>
      </Link>
      <Link to="/products/0?category=chalk" style={linkStyle}>
        <div className="category-box styled-box styled-link-box">
          <img src={chalkPic} alt="shop chalk" />
          <p>Chalk</p>
        </div>
      </Link>
    </section>
  );
};

export default CategoryList;
