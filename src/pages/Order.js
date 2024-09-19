import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Order.css";

const OrderPage = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [quantity, setQuantity] = useState(1); // New state for quantity
  const [totalPrice, setTotalPrice] = useState(0); // New state for total price
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve pizza information from local storage
    const pizza = JSON.parse(localStorage.getItem('selectedPizza'));
    if (pizza) {
      setSelectedPizza(pizza);
      setTotalPrice(pizza.price); // Set initial total price
    } else {
      // If no pizza data is found, redirect to home or show an error
      navigate('/');
    }
  }, [navigate]);

  // Handle quantity change and recalculate the total price
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      setTotalPrice(newQuantity * selectedPizza.price);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPizza) {
      alert('No pizza selected');
      return;
    }

    const orderDetails = {
      username,
      pizza_name: selectedPizza.name,
      quantity,
      price: selectedPizza.price * quantity,
      phone_number: phoneNumber,
      payment_mode: paymentMode,
      delivery_location: deliveryLocation,
    };
    

  

    try {
      const response = await fetch('http://localhost:5000/api/auth/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        navigate("/"); // Redirect to home page
      } else {
        alert('Failed to place the order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order');
    }
  };

  return (
    <div className="orderPage">
      <h1>Order Page</h1>
      {selectedPizza ? (
        <div className="pizzaDetails">
          <img src={selectedPizza.image} alt={selectedPizza.name} />
          <h2>{selectedPizza.name}</h2>
          <p>Price: ${selectedPizza.price.toFixed(2)}</p>

          {/* Quantity Input */}
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              required
            />
          </div>

          {/* Updated Total Price */}
          <p>Total Price: ${totalPrice.toFixed(2)}</p>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="paymentMode">Payment Mode:</label>
              <input
                type="text"
                id="paymentMode"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="deliveryLocation">Delivery Location:</label>
              <input
                type="text"
                id="deliveryLocation"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                required
              />
            </div>
            <button type="submit">Place Order</button>
          </form>
        </div>
      ) : (
        <p>No pizza selected</p>
      )}
    </div>
  );
};

export default OrderPage;
