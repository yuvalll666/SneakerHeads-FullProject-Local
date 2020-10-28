import React, { useState, useEffect } from "react";
import http from "../../services/httpService";
import { apiUrl, userRole } from "../../config.json";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
const { ADMIN, EDITOR, NORMAL } = userRole;

function HandleProductsPage() {
  const user = useContext(UserContext);
  const [Products, setProducts] = useState([]);
  const { addToast } = useToasts();
  console.log(Products);
  useEffect(() => {
    http
      .get(`${apiUrl}/admin/handle-products/getAllProducts`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.response);
        addToast("Error: Couldn't fetch products from the server", {
          appearance: "error",
        });
      });
  }, []);

  if (user && user.role === NORMAL) {
    return <Redirect to="/" />;
  }
  return <div></div>;
}

export default HandleProductsPage;
