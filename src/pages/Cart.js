import React from "react";
import { useNavigate } from "react-router-dom"; 
import CartItem from "../components/CartItem";
import { CartList } from "../helpers/CartList"; 

function Cart({ addToCart }) {
  const navigate = useNavigate(); 

  const handleOrderNow = (cartItem) => {
    
    addToCart(cartItem);

    localStorage.setItem('selectedPizza', JSON.stringify(cartItem)); 
    navigate('/login'); // Navigate to the login page
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
            onOrder={() => handleOrderNow(cartItem)} 
          />
        ))}
      </div>
    </div>
  );
}

export default Cart;
