import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import PrimaryButton from "./forms/PrimaryButton";
import ImageSlider from "../components/utils/ImageSlider";
import { Col, Row, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import CheckBox from "../components/utils/CheckBox";


function ProductsLandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);

  useEffect(() => {
    const variables = {
      skip: skip,
      limit: limit,
    };

    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    http.post(`${apiUrl}/products/getProducts`, variables).then((response) => {
      if (response.data.success) {
        setProducts([...products, ...response.data.products]);
        setPostSize(response.data.postSize);
      } else {
        alert("Faild to fetch products data");
      }
    });
  };

  const onLoadMore = () => {
    let skipLimit = skip + limit;

    const variables = {
      skip: skipLimit,
      limit: limit,
    };

    getProducts(variables);

    setSkip(skipLimit);
  };

  const renderCards = products.map((prod, index) => {
    return (
      <Col lg={6} md={8} xs={12} key={index}>
        <Card
          style={{ backgroundColor: "#fafafa" }}
          bordered={false}
          hoverable={true}
          cover={<ImageSlider images={prod.images} />}
        >
          <Meta title={prod.title} description={`$${prod.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 m-4">
          <h2 className="text-center">View Our Products!</h2>
        </div>
      </div>

      <CheckBox />

      {/* fiter */}

      {products.length === 0 ? (
        <div className="row justify-content-center">
          <div
            style={{ height: "300px" }}
            className="d-flex justify-content-center align-items-center"
          >
            <h2>Loading Post...</h2>
          </div>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}

      {postSize >= limit && (
        <div className="row justify-content-center">
          <div>
            <PrimaryButton onClick={onLoadMore} fullWidth={false}>
              Load More
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsLandingPage;
