import React, { useEffect, useState } from "react";
import "../css/HomePage.css";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { Col, Row, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import ImageSlider from "./utils/ImageSlider";
import { useToasts } from "react-toast-notifications";
import PageHeader from "./utils/PageHeader";

function Home() {
  const { addToast } = useToasts();
  const [ViewsProducts, setViewsProducts] = useState([]);

  useEffect(() => {
    const limit = 4;
    http.post(`${apiUrl}/products/getMostViews`, { limit }).then((response) => {
      if (response.data.success) {
        setViewsProducts(response.data.products);
      } else {
        addToast("Faild to fetch products", {
          appearance: "error",
        });
      }
    });
  }, []);

  const renderCards = ViewsProducts.map((prod, index) => {
    return (
      <Col xs={12} md={8} lg={6}>
        <Card
          style={{
            backgroundColor: "#fafafa",
            overflow: "hidden",
          }}
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
      <div className="d-sm-block d-md-none">
        <PageHeader>Home</PageHeader>
      </div>

      <div className="home-page-header d-none d-sm-none d-md-block">
        {/* stripe image */}
      </div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-8">
            <h2 className="mb-0 row-title">Popular Brands</h2>
          </div>
          <div className="col-4 d-flex align-items-end justify-content-end">
            <Typography component="h5">
              <Link className="see-all text-success" to="/products">
                See All
              </Link>
            </Typography>
          </div>
        </div>

        <div className="row scroll" style={{ overflowX: "auto" }}>
          <div className="col-12 d-flex">
            <div className="p-2 brands-container ">
              <Link to="/brands/jordan">
                <img
                  src="http://localhost:3000/images/000-air-jordan.jpg"
                  alt=""
                  className="brands"
                />
                <div className="side-image-container jordan" />
              </Link>
            </div>
            <div className="p-2 brands-container">
              <Link to="/brands/nike">
                <img
                  width="250px"
                  src="http://localhost:3000/images/001-nike.jpg"
                  alt=""
                  className="brands"
                />
                <div className="side-image-container nike" />
              </Link>
            </div>
            <div className="p-2 brands-container ">
              <Link to="/brands/yeezy">
                <img
                  width="250px"
                  src="http://localhost:3000/images/002-yeezy.jpg"
                  alt=""
                  className="brands"
                />
                <div className="side-image-container yeezy" />
              </Link>
            </div>
            <div className="p-2 brands-container ">
              <Link to="/brands/adidas">
                <img
                  width="250px"
                  src="http://localhost:3000/images/003-adidas.jpg"
                  alt=""
                  className="brands"
                />
                <div className="side-image-container adidas" />
              </Link>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-8">
            <h2 className="mb-0 row-title">Most Popular</h2>
          </div>
          <div className="col-4 d-flex align-items-end justify-content-end">
            <Typography component="h5">
              <Link className="see-all text-success" to="/products">
                See All
              </Link>
            </Typography>
          </div>
        </div>
        <Row gutter={[16, 16]}>{renderCards}</Row>
        {/*Eaxmples!!!!!!!!!!!!!!!!!! */}
        <div className="row">
          <div className="col-12 mt-4">
            <h2>What's New ?</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
