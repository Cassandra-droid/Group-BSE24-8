import React from "react";
import PropTypes from "prop-types";

function MenuItem({ image, name, price }) {
  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }} className="menuItemImage"></div>
      <h1>{name}</h1>
      <p>$.{price}</p>
    </div>
  );
}

// Define prop-types for MenuItem
MenuItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default MenuItem;
