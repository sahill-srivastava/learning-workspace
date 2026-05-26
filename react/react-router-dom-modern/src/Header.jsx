import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav_container">
      <h1>Navbar</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default Header;
