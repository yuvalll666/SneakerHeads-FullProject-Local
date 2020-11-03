import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";

/**
 * Move to dynamic url
 * @param {String} brandName - Brand name
 */
const changeLocation = (brandName) => {
  return (window.location = `/brands/${brandName}`);
};

function PopularBrands() {
  return (
    <div>
      <div className="row mt-4">
        <div className="col-8">
          <h2 className="mb-0 row-title">Popular Brands</h2>
        </div>
        <div className="col-4 d-flex align-items-end justify-content-end">
          <Typography component="h5">
            <Link className="see-all text-success" to="/products">
              See All
            </Link>
          </Typography>
        </div>
      </div>
      <div className="row scroll" style={{ overflowX: "auto" }}>
        <div className="col-12 d-flex justify-content-between">
          <div className="p-2 brands-container ">
            <Link to="#" onClick={() => changeLocation("jordan")}>
              <img
                src="http://localhost:3000/images/000-air-jordan.jpg"
                alt=""
                className="brands"
              />
              <div className="side-image-container jordan" />
            </Link>
          </div>
          <div className="p-2 brands-container">
            <Link to="#" onClick={() => changeLocation("nike")}>
              <img
                width="250px"
                src="http://localhost:3000/images/001-nike.jpg"
                alt=""
                className="brands"
              />
              <div className="side-image-container nike" />
            </Link>
          </div>
          <div className="p-2 brands-container ">
            <Link to="#" onClick={() => changeLocation("yeezy")}>
              <img
                width="250px"
                src="http://localhost:3000/images/002-yeezy.jpg"
                alt=""
                className="brands"
              />
              <div className="side-image-container yeezy" />
            </Link>
          </div>
          <div className="p-2 brands-container ">
            <Link to="#" onClick={() => changeLocation("adidas")}>
              <img
                width="250px"
                src="http://localhost:3000/images/003-adidas.jpg"
                alt=""
                className="brands"
              />
              <div className="side-image-container adidas" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularBrands;
