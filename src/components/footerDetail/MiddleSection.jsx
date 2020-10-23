import React from "react";
import "../../css/Footer.css";
import { Link } from "react-router-dom";
function MiddleSection() {
  return (
       <div className="navbar-container">
      <nav className="footer-navbar">
        <h5 className="section-headline">Brands</h5>
        <div>
          <ul>
            <li>
              <Link className="links" to="/">Air Jordan</Link>
            </li>
            <li>
              <Link className="links" to="/products">Nike</Link>
            </li>
            <li>
              <Link className="links" to="/cart">Adidas</Link>
            </li>
            <li>
              <Link className="links" to="/user-page">Yeezy</Link>
            </li>
            <li>
              <Link className="links" to=""> </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default MiddleSection
