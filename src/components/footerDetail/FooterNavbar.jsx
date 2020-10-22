import React from "react";
import "../../css/Footer.css";
import { Link } from "react-router-dom";

function FooterNavbar() {
  return (
    <div className="navbar-container">
      <nav className="footer-navbar">
        <h5 className="section-headline text-center">Collection</h5>
        <div className="">
          <ul>
            <li>
              <Link className="links" to="/">Home Page</Link>
            </li>
            <li>
              <Link className="links" to="/products">Browse</Link>
            </li>
            <li>
              <Link className="links" to="/cart">My Cart</Link>
            </li>
            <li>
              <Link className="links" to="/user-page">Settings</Link>
            </li>
            <li>
              <Link className="links" to=""> </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default FooterNavbar;
