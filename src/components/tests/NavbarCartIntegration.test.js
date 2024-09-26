import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar"; 
import Cart from "../../pages/Cart"; 
import { CartList } from "../../helpers/CartList"; 
import '@testing-library/jest-dom/extend-expect'; 
import { useNavigate } from "react-router-dom";

// Mocking useNavigate to control navigation in tests
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

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
