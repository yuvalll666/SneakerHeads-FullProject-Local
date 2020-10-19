import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import http from "../services/httpService";
import { apiUrl } from "../config.json";

function Cart() {
  const user = useContext(UserContext);
  const { cart } = user;
  console.log(cart);

  useEffect(() => {
    let cartItemsIds = [];

    if (user && cart.length > 0) {
      cart.forEach((item) => {
        cartItemsIds.push(item._id);
      });

      http
        .get(`${apiUrl}/products/products_by_id?id=${cartItemsIds}&type=array`)
        .then((response) => {
          console.log(response.data);
        });
    }
  }, [cart]);

  return <div></div>;
}

export default Cart;
