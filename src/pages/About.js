import React from "react";
import MultiplePizzas from "../assets/multiplePizzas.jpg";
import "../styles/About.css";
function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${MultiplePizzas})` }}
      ></div>
      <div className="aboutBottom">
        <h1> ABOUT US</h1>
        <p>
        Home Pizza is a restaurant that specializes in homemade pizzas made with fresh ingredients.
        They offer a variety of customizable pizza options to suit different tastes,
        as well as appetizers, sides, and desserts.
        The restaurant's mission is to provide customers with a delicious and satisfying pizza experience.
        Thank you for choosing Home Pizza!
        </p>
      </div>
    </div>
  );
}

export default About;