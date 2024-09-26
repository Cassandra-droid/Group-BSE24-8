import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import '@testing-library/jest-dom';


const renderNavbar = (cartCount = 0) => {
    return render(
        <BrowserRouter>
            <Navbar cartCount={cartCount} />
        </BrowserRouter>
    );
};

describe('Navbar Component', () => {
    test('renders Navbar with links and cart count', () => {
        renderNavbar(5); // Adjust this based on your render function

        const homeLinks = screen.getAllByText(/Home/i);
        expect(homeLinks.length).toBe(2); // Check that there are exactly 2 Home links

        const menuLinks = screen.getAllByText(/Menu/i);
        expect(menuLinks.length).toBe(2);

        const aboutLinks = screen.getAllByText(/About/i);
        expect(aboutLinks.length).toBe(2);
        
        const contactLinks = screen.getAllByText(/Contact/i);
        expect(contactLinks.length).toBe(2);
        
        const cartLinks = screen.getAllByText(/Cart: 5/i);
        expect(cartLinks.length).toBeGreaterThan(0);
    });

    test('toggles the navbar when clicking the button', () => {
        const { container } = renderNavbar();

        screen.debug();

        const toggleButton = screen.getByRole('button');
        const leftSideNavbar = container.querySelector('.leftside'); // if you get container from render
 
        // Initially, the navbar should be closed
        expect(leftSideNavbar).toHaveAttribute('id', 'close');

        fireEvent.click(toggleButton); // Simulate click to open
        expect(leftSideNavbar).toHaveAttribute('id', 'open');

        fireEvent.click(toggleButton); // Simulate click to close again
        expect(leftSideNavbar).toHaveAttribute('id', 'close');
    });

    test('renders ShoppingCartIcon with cart count', () => {
        renderNavbar(3);

        expect(screen.getByTestId('ShoppingCartIcon')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });
});
