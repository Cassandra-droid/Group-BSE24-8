import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Menu from "./pages/Menu.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Cart from "./pages/Cart.js";
import Login from "./pages/Login.js";
import Order from "./pages/Order.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import { getCLS, getFID, getLCP } from 'web-vitals';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

// Initialize Sentry
Sentry.init({
  dsn: "https://e4ede56747bb16ddfff952a1a86c4a92@o4508126074765312.ingest.us.sentry.io/4508126084136960",
  integrations: [Sentry.browserTracingIntegration()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", "http://group-bse-24-8.vercel.app/"],
});


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
        <Route path="/cart" element={<Cart addToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// Web Vitals for Performance Metrics
function sendToAnalytics(metric) {
  // POST the metrics to your backend (Prometheus or InfluxDB)
  fetch('https://group-bse-24-8.vercel.app/metrics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metric),
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);

export default Sentry.withProfiler(App);
