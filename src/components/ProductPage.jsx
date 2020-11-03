import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import ProductCarousel from "./productDetails/ProductCarousel";
import ProductInfo from "./productDetails/ProductInfo";
import { Typography } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

/**
 * Component - Product page, single product
 * @component
 */
const ProductPage = (props) => {
  const { addToast } = useToasts();
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);
  /**
   * On page load fetch single product data from DB using _id
   */
  useEffect(() => {
    http
      .get(`${apiUrl}/products/product_by_id?id=${productId}`)
      .then((response) => {
        setProduct(response.data[0]);
      });
  }, []);

  /**
   * Send request to server to add a product to the cart
   * @param {String} productId - product id number
   */
  const addToCartHandler = async (productId) => {
    await http
      .post(`${apiUrl}/users/addToCart`, { productId })
      .then((response) => {
        // Replace user's JWT token to new one in local storage
        localStorage.setItem("token", response.data.token);
      })
      .catch((err) =>
        addToast(
          "Error: Unexpcted problem. Coludn't add this products to your cart",
          { appearance: "error" }
        )
      );
    // Move to Cart page
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
