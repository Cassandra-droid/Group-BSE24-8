import React from "react";
import { useNavigate } from "react-router-dom";
import { CartList } from "../helpers/CartList";
import CartItem from "../components/CartItem";
import "../styles/Cart.css";

function Cart({ addToCart }) {
  const navigate = useNavigate();

  const handleSelectPizza = (pizza) => {
    // Store the selected pizza in local storage
    localStorage.setItem('selectedPizza', JSON.stringify(pizza));

    // Update the cart count in the parent component
    addToCart(pizza);

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="cart">
      <h1 className="CartTitle">Order Now</h1>
      <div className="cartList">
        {CartList.map((cartItem, key) => (
          <CartItem
            key={key}
            image={cartItem.image}
            name={cartItem.name}
            price={cartItem.price}
            selectPizza={() => handleSelectPizza(cartItem)} // Pass cartItem to handleSelectPizza
          />
        ))}
      </div>
    </div>
  );
}

export default Cart;
