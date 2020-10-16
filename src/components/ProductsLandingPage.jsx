import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import PrimaryButton from "./forms/PrimaryButton";
import ImageSlider from "../components/utils/ImageSlider";
import { Col, Row, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import CheckBox from "./utils/CheckBox";
import RadioBox from "./utils/RadioBox";

function ProductsLandingPage() {
  const [Products, setProducts] = useState([]);
  const [limit, setLimit] = useState(12);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilter] = useState({
    brand: [],
    price: [],
  });
  const [lastId, setLastId] = useState("");

  useEffect(() => {
    const variables = {
      limit: limit,
    };

    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    http.post(`${apiUrl}/products/getProducts`, variables).then((response) => {
      if (response.data.success) {
        const { products, postSize } = response.data;
        if (!products.length) {
          setPostSize(0);
        }

        if (variables.loadMore) {
          setProducts([...Products, ...products]);
        } else {
          setProducts(products);
        }

        let lastIndex = products.length - 1;

        setPostSize(postSize);
        if (products[lastIndex] && products[lastIndex]._id) {
          setLastId(products[lastIndex]._id);
        }
      } else {
        alert("Faild to fetch products data");
      }
    });
  };

  const onLoadMore = () => {
    const variables = {
      lastId: lastId,
      limit: limit,
      loadMore: true,
    };

    getProducts(variables);
  };

  const filteredResults = (filters) => {
    const variables = {
      // skip: 0,
      limit: limit,
      filters: filters,
    };
    getProducts(variables);
    // setSkip(0);
  };

  const handleFilters = (filters, category) => {
    const newFilter = { ...Filters };

    newFilter[category] = filters;
    console.log(newFilter);

    if (category === "price") {
    }

    filteredResults(newFilter);
    setFilter(newFilter);
  };

  const renderCards = Products.map((prod, index) => {
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

      {/* Filter */}

      <div className="row mb-4">
        <div className="col-lg-6 col-md-6">
          <CheckBox
            handleFilters={(filters) => handleFilters(filters, "brand")}
          />
        </div>
        <div className="col-lg-6 col-md-6">
          <RadioBox
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
      </div>

      {/* Search */}

      {Products.length === 0 ? (
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

      {PostSize >= limit && (
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
