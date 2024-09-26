import React from "react";

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

export default CartItem;
