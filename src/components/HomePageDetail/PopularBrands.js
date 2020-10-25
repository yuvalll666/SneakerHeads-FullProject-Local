import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

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
            <Link to="/brands/jordan">
              <img
                src="http://localhost:3000/images/000-air-jordan.jpg"
                alt=""
                className="brands"
              />
              <div className="side-image-container jordan" />
            </Link>
          </div>
          <div className="p-2 brands-container">
            <Link to="/brands/nike">
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
            <Link to="/brands/yeezy">
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
            <Link to="/brands/adidas">
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
