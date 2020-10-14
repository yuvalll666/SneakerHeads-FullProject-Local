import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";

function ProductsLandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    http.get(`${apiUrl}/products/getProducts`).then((response) => {
      if (response.data.success) {
        setProducts(response.data.products);

        console.log(response.data.products);
      } else {
        alert("Faild to fetch products data");
      }
    });
  }, []);
  return <div></div>;
}

export default ProductsLandingPage;
