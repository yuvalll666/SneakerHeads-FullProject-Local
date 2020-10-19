import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import http from "../services/httpService";
import { apiUrl } from "../config.json";

function Cart() {
  const user = useContext(UserContext);
  const { cart } = user;
  const [ProductsInfo, setProductsInfo] = useState([]);

  useEffect(() => {
    let cartItemsIds = [];

    if (user && cart) {
      if (cart && cart.length > 0) {
        cart.forEach((item) => {
          cartItemsIds.push(item._id);
        });

        http
          .get(`${apiUrl}/products/product_by_id?id=${cartItemsIds}&type=array`)
          .then((response) => {
            cart.forEach((cartItem) => {
              response.data.forEach((product, index) => {
                if (cartItem._id === product._id) {
                  response.data[index].quantity = cartItem.quantity;
                }
              });
            });

            setProductsInfo(response.data);
          });
      }
    }
  }, [cart]);

  console.log(ProductsInfo);

  return <div></div>;
}

export default Cart;
