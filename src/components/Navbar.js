import React, { useState } from "react";
import Logo from "../assets/pizzalogo.png";
import { Link } from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "../styles/Navbar.css";

function Navbar({ cartCount }) {
    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    };
    
    return (
        <nav className="navbar"> 
            <div className="leftside" id={openLinks ? "open" : "close"}>
                <img src={Logo} alt="Website Logo" />
                <div className="hiddenLinks">
                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/cart">
                        <div className="cartContainer">
                            <span>Cart: {cartCount}</span> {/* Display cart count */}
                        </div>
                    </Link>
                </div>
            </div>
            <div className="rightside">
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/cart">
                    <div className="cartContainer">
                        <ShoppingCartIcon />
                        <span className="cartCount">{cartCount}</span>
                    </div>
                </Link>

                <button onClick={toggleNavbar}>
                    <ReorderIcon />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
