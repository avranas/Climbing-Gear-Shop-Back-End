import React from 'react';
import { Link } from "react-router-dom";
import "./NavButtons.css";

//Props are page,
const NavButtons = (props) => {
  return (
    <div id="directional-buttons">
      <div className="direction-button-container">
        {!props.prevDisabled ? (
          <Link to={props.prevLink}>
            <button aria-label="Previous" id="prev-active" className="direction-button styled-box">
              Previous
            </button>
          </Link>
        ) : (
          <button
            aria-label="Previous"
            disabled
            id="prev"
            className="direction-button direction-button-disabled styled-box"
          >
            Previous
          </button>
        )}
      </div>
      <div className="direction-button-container">
        {!props.nextDisabled ? (
          <Link to={props.nextLink}>
            <button aria-label="Next" className="direction-button styled-box" id="next-active">
              Next
            </button>
          </Link>
        ) : (
          <button
            disabled
            id="prev"
            aria-label="Next"
            className="direction-button direction-button-disabled styled-box"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default NavButtons;
