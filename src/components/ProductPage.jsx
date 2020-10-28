import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import ProductCarousel from "./productDetails/ProductCarousel";
import ProductInfo from "./productDetails/ProductInfo";
import { Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const ProductPage = (props) => {
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    http
      .get(`${apiUrl}/products/product_by_id?id=${productId}`)
      .then((response) => {
        setProduct(response.data[0]);
      });
  }, []);

  const addToCartHandler = async (productId) => {
    await http
      .post(`${apiUrl}/users/addToCart`, { productId })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
      })
      .catch((err) => console.log("err : ", err));

    window.location = "/cart"; 
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

    </div>
  );
};

export default ProductPage;
