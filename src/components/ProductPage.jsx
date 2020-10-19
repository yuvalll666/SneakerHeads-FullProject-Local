import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import ProductCarousel from "./productDetails/ProductCarousel";
import ProductInfo from "./productDetails/ProductInfo";
import { Typography } from "@material-ui/core";

const ProductPage = (props) => {
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    http
      .get(`${apiUrl}/products/product_by_id?id=${productId}&type=single`)
      .then((response) => {
        setProduct(response.data[0]);
      });
  }, []);

  const addToCartHandler = (productId) => {
    http
      .post(`${apiUrl}/users/addToCart`, { productId })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
      })
      .catch((err) => console.log("err : ", err));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {Product.tags && (
          <div className="mt-4 col-10">{Product.tags.join(" / ")}</div>
        )}
        <div className="col-12 text-center">
          <Typography className="mt-4" component="h1" variant="h3">
            {Product.title}
          </Typography>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-12">
          <ProductCarousel product={Product} />
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <ProductInfo addToCart={addToCartHandler} product={Product} />
      </div>

      {/* <div className="row mt-4">
        <div className="col-12 mt-4 rounded border">
          <h2>Reviews</h2>
          <div className="review">
            <div className="mt-4 border p-3 ">
              <div className="border-bottom pb-3 d-flex">
                <div className="mr-auto">
                  <i className="fas fa-user"></i>
                  <span className="ml-2 ">User name</span>
                </div>
                <div className="ml-auto">
                  <span>edit</span>
                  <span className="ml-2 mt-0 ">delete</span>
                </div>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Veritatis perferendis aut quae fugit! A deserunt quae officia,
                consequuntur, officiis vitae molestias necessitatibus assumenda
                est at iusto saepe maxime? Iste, natus.
              </p>
            </div>
          </div>
          <div className="review ">
            <div className="mt-4 border p-3">
              <div className="border-bottom pb-3 d-flex">
                <div className="mr-auto">
                  <i className="fas fa-user"></i>
                  <span className="ml-2 ">User name</span>
                </div>
                <div className="ml-auto">
                  <span>edit</span>
                  <span className="ml-2 mt-0 ">delete</span>
                </div>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Veritatis perferendis aut quae fugit! A deserunt quae officia,
                consequuntur, officiis vitae molestias necessitatibus assumenda
                est at iusto saepe maxime? Iste, natus.
              </p>
            </div>
          </div>
          <div className="review">
            <div className="mt-4 border p-3 ">
              <div className="border-bottom pb-3 d-flex">
                <div className="mr-auto">
                  <i className="fas fa-user"></i>
                  <span className="ml-2 ">User name</span>
                </div>
                <div className="ml-auto">
                  <span>edit</span>
                  <span className="ml-2 mt-0 ">delete</span>
                </div>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Veritatis perferendis aut quae fugit! A deserunt quae officia,
                consequuntur, officiis vitae molestias necessitatibus assumenda
                est at iusto saepe maxime? Iste, natus.
              </p>
            </div>
          </div>
          <button className="btn btn-primary float-right mt-3 mb-3">
            add a review
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default ProductPage;
