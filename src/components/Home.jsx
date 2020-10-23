import PageHeader from "./utils/PageHeader";
import React, { useEffect, useState } from "react";
import "../css/HomePage.css";
import http from "../services/httpService";
import { apiUrl } from "../config.json";

function Home() {
  useEffect(() => {

    http
      .get(`${apiUrl}/products/getMostPopular`)
      .then((response) => {
        if (response.data.success) {
        } else {
          alert("Faild to fetch products");
        }
      });
  }, []);

  return (
    <div>
      <div className="home-page-header"></div>
    </div>
  );
}

export default Home;
