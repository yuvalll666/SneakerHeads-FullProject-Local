import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import PrimaryButton from "./forms/PrimaryButton";
import ImageSlider from "../components/utils/ImageSlider";
import { Col, Row, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import CheckBox from "./productDetails/CheckBox";
import RadioBox from "./productDetails/RadioBox";
import { brands, price } from "../datas";
import SearchFeature from "./productDetails/SearchFeature";

function ProductsLandingPage() {
  const [SearchValue, setSearchValue] = useState("");
  const [Products, setProducts] = useState([]);
  const [Limit, setLimit] = useState(12);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilter] = useState({
    brand: [],
    price: [],
  });
  const [LastId, setLastId] = useState("");

  useEffect(() => {
    const variables = {
      limit: Limit,
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
      lastId: LastId,
      limit: Limit,
      loadMore: true,
    };

    getProducts(variables);
  };

  const filteredResults = (filters) => {
    const variables = {
      limit: Limit,
      filters: filters,
    };
    getProducts(variables);
  };

  const handlePrice = (value) => {
    let array = [];

    for (let key in price) {
      if (price[key]._id === parseInt(value, 10)) {
        array = price[key].array;
      }
    }

    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilter = { ...Filters };

    if (category === "price") {
      let priceValue = handlePrice(filters);
      newFilter[category] = priceValue;
    } else {
      newFilter[category] = filters;
    }

    filteredResults(newFilter);
    setFilter(newFilter);
  };

  const updateSearchValues = (newSearchTerm) => {
    const variables = {
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSearchValue(newSearchTerm);

    getProducts(variables);
  };

  const renderCards = Products.map((prod, index) => {
    return (
      <Col lg={6} md={8} xs={12} key={index}>
        <Card
          style={{ backgroundColor: "#fafafa" }}
          bordered={false}
          hoverable={true}
          cover={<a href={`/products/${prod._id}`}><ImageSlider images={prod.images} /> </a>}
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

      <div className="row mb-2">
        <div className="col-lg-6 col-md-6">
          <CheckBox
            brands={brands}
            handleFilters={(filters) => handleFilters(filters, "brand")}
          />
        </div>
        <div className="col-lg-6 col-md-6">
          <RadioBox
            price={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
      </div>

      {/* Search */}
      <div className="d-flex justify-content-end">
        <SearchFeature refreshFunction={updateSearchValues} />
      </div>

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

      {PostSize >= Limit && (
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
