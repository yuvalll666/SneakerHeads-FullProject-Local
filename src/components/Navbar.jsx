import React from "react";
import { Link, NavLink } from "react-router-dom";
import Badge from "@material-ui/core/Badge";

function Navbar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand mb-0 h1" to="/">
          SneakerHeads
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="dropdown04"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Brands
              </Link>
              <div className="dropdown-menu" aria-labelledby="dropdown04">
                <Link className="dropdown-item" to="#">
                <strong className="mr-2">Jordan</strong>
                  <img width="30px" src="/images/JumpMan.png"></img>
                </Link>
                <Link className="dropdown-item" to="#">
                  <strong className="mr-2">Nike</strong>
                  <img width="40px" src="/images/nikeSwoosh.png"></img>
                </Link>
                <Link className="dropdown-item" to="#">
                <strong className="mr-2">Yeezy</strong>
                  <img width="40px" src="/images/yeezyLogo.png"></img>
                </Link>
                <Link className="dropdown-item" to="#">
                  <strong className="mr-2">Adidas</strong>
                  <img width="30px" src="/images/adidasLogo.png"></img>
                </Link>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signin">
                    Signin
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/step1">
                    Signup
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="dropdown04"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.firstName + " " + user.lastName}
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="dropdown04">
                    <Link className="dropdown-item" to="/history">
                      <i className="fas fa-history"></i> History
                    </Link>
                    <Link className="dropdown-item" to="/user-page">
                      <i className="fas fa-cog"></i> Settings
                    </Link>
                    <Link className="dropdown-item" to="/logout">
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/upload-product">
                    <i className="fas fa-upload fa-2x"></i>
                  </NavLink>
                </li>
                <li className="nav-item mr-4">
                  <NavLink className="nav-link" to="/cart">
                    <Badge
                      badgeContent={user.cart && user.cart.length}
                      color="secondary"
                    >
                      <i className="fas fa-shopping-cart fa-2x"></i>
                    </Badge>
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
