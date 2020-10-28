import React, { useState, useEffect } from "react";
import http from "../../services/httpService";
import { apiUrl, userRole } from "../../config.json";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
const { ADMIN, EDITOR, NORMAL } = userRole;

function HandleProductsPage() {
  const user = useContext(UserContext);
  const [Products, setProducts] = useState([]);

  useEffect(() => {

    http.get(`${apiUrl}`)

  }, []);





  if (user && user.role === NORMAL) {
    return <Redirect to="/" />;
  }
  return <div></div>;
}

export default HandleProductsPage;
