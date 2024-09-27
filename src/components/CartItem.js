import React from "react";
import PropTypes from "prop-types";

const CartItem = ({ image, name, price, selectPizza }) => {
  return (
    <div className="cartItem">
      <img src={image} alt={name} className="cartItemImage" />
      <h2 className="cartItemName">{name}</h2>
      <p className="cartItemPrice">${price.toFixed(2)}</p>
      <button 
        onClick={() => selectPizza({ image, name, price })} 
        className="selectButton"
      >
        Order Now
      </button>
    </div>
  );
};

// Define prop-types for CartItem
CartItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  selectPizza: PropTypes.func.isRequired,
};

export default CartItem;
