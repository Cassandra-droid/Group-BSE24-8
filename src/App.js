import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Menu from "./pages/Menu.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Cart from "./pages/Cart.js"; // Import Cart page
import Login from "./pages/Login.js";
import Order from "./pages/Order.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

function App() {
  const [cartCount, setCartCount] = useState(0);

  // Function to add an item to the cart
  const addToCart = () => {
    setCartCount(cartCount + 1); // Update cart count
  };

  return (
    <Router>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart addToCart={addToCart} />} /> {/* Pass addToCart to Cart */}
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
