import React, { useEffect, useState } from "react";
import "../css/HomePage.css";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { Col, Row, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import ImageSlider from "./utils/ImageSlider";

function Home() {
  const [ViewsProducts, setViewsProducts] = useState([]);

  useEffect(() => {
    const limit = 6;
    http.post(`${apiUrl}/products/getMostViews`, { limit }).then((response) => {
      if (response.data.success) {
        setViewsProducts(response.data.products);
      } else {
        alert("Faild to fetch products");
      }
    });
  }, []);

  console.log(ViewsProducts);

  const renderCards = ViewsProducts.map((prod, index) => {
    return (
      <Col lg={4} md={8} xs={12} key={index}>
        <Card
          style={{ backgroundColor: "#fafafa" }}
          bordered={false}
          hoverable={true}
          cover={
            <a href={`/products/${prod._id}`}>
              <ImageSlider images={prod.images} />{" "}
            </a>
          }
        >
          <div className="card-title">{prod.title} </div>
          <Meta description={`$${prod.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <div className="home-page-header">{/* stripe image */}</div>

      <div className="container">
        <div className="row">
          <div className="col-6">
            <h2 className="display-4 mb-0 mt-4">Most Popular</h2>
          </div>
          <div className="col-6 d-flex align-items-end justify-content-end">
            <Typography component="h5">
              <Link className="see-all text-success" to="/products">
                See All
              </Link>
            </Typography>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-12">
            <div className="mt-2">
              <Row gutter={[16, 16]}>{renderCards}</Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
