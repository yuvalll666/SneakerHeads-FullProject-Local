import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import PrimaryButton from "./forms/PrimaryButton";
import ProductCard from "./utils/ProductCard";
import ProductPage from "./ProductPage";

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

  // const renderProducts = products.map((prod, index) => {
  //   return (
  //     <div key={index} className="col-lg-3 col-md-4 col-sm-12">
  //       <ProductCard />
  //     </div>
  //   );
  // });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12 m-4">
          <h2 className="text-center">View Our Products!</h2>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {products.length === 0 ? (
            <div
              style={{ height: "300px" }}
              className="d-flex justify-content-center align-items-center"
            >
              <h2>Loading Post...</h2>
            </div>
          ) : 

          <div></div>
          // (
          //   products.map((prod, index) => {
          //     return (
          //       <div key={index} className="col-lg-3 col-md-4 col-sm-12 mb-4">
          //         <ProductCard product={prod} />
          //       </div>
          //     );
          //   })
          // )
          }
        </div>
      </div>

      <div className="row justify-content-center">
        <div>
          <PrimaryButton fullWidth={false}>Load More</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default ProductsLandingPage;
