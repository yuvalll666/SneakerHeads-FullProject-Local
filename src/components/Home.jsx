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
import PopularBrands from "./HomePageDetail/PopularBrands";

function Home() {
  const { addToast } = useToasts();
  const [ViewsProducts, setViewsProducts] = useState([]);

  useEffect(() => {
    const limit = 8;
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
          bordered={true}
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
        <PopularBrands />

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
        <div className="mt-2">
          <Row gutter={[30, 16]}>{renderCards}</Row>
        </div>

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
