import React from "react";
import { render, screen } from "@testing-library/react"; // Removed fireEvent
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar"; 
import '@testing-library/jest-dom/extend-expect'; 

// Removed unused imports of Cart, CartList, and useNavigate

// Mock localStorage for the test
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
});

// Helper function to render with router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route); // Set initial route
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe("Integration Test for Cart and Navbar", () => {
  test("displays the correct cart count in the Navbar", () => {
    const cartCount = 3; 
    renderWithRouter(<Navbar cartCount={cartCount} />); 

    // Check that the cart count is displayed correctly
    expect(screen.getByText(/Cart: 3/i)).toBeInTheDocument(); 
  });
});
