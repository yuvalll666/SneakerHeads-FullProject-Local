import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { Typography, makeStyles } from "@material-ui/core";
import MainContainer from "./forms/MainContainer";
import { Empty, Result } from "antd";
import CartTable from "./cartDetail/CartTable";
import Paypal from "./utils/Paypal";
import ProductInfo from "./productDetails/ProductInfo";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((them) => ({
  total: {
    alignSelf: "start",
    marginTop: them.spacing(4),
  },
  paypal: {
    alignSelf: "start",
  },
}));

function Cart() {
  const styles = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const { cart } = user;
  const [ProductsInfo, setProductsInfo] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [ShowSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let cartItemsIds = [];

    if (user && cart) {
      if (cart && cart.length > 0) {
        cart.forEach((item) => {
          cartItemsIds.push(item._id);
        });

        http
          .get(`${apiUrl}/products/product_by_id?id=${cartItemsIds}&type=array`)
          .then((response) => {
            cart.forEach((cartItem) => {
              response.data.forEach((product, index) => {
                if (cartItem._id === product._id) {
                  response.data[index].quantity = cartItem.quantity;
                }
              });
            });
            setProductsInfo(response.data);
          });
      }
    }
  }, [cart]);

  useEffect(() => {
    if (ProductsInfo.length > 0) {
      totalSum(ProductsInfo);
    }
  }, [ProductsInfo]);

  const totalSum = (productsInfo) => {
    let total = 0;
    productsInfo.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotalPrice(total);
  };

  const removeFromCart = (productId) => {
    http
      .get(`${apiUrl}/users/removeFromCart?_id=${productId}`)
      .then((response) => {
        const { cart, products } = response.data;
        cart.forEach((cartItem) => {
          products.forEach((prod, i) => {
            if (cartItem._id === prod._id) {
              products[i].quantity = cartItem.quantity;
            }
          });
        });
        localStorage.setItem("token", response.data.token);
        window.location = "/cart";
      })
      .catch((err) => console.log("err : ", err));
  };

  const transactionSuccess = (data) => {
    const variables = {
      cartDetail: ProductsInfo,
      paymentData: data,
    };

    http.post(`${apiUrl}/users/successBuy`, variables).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setShowSuccess(true);
        history.push("/thank-you");
      } else {
        alert("Failed to purchase item/s");
      }
    });
  };

  const transactionError = () => {
    console.log("Paypal error");
  };

  const transactionCanceled = () => {
    console.log("Transaction canceled");
  };

  return (
    <div>
      <MainContainer maxWidth="md">
        <Typography className="mb-4" component="h1" variant="h3">
          <span role="img" aria-label="clipboard">
            📋
          </span>{" "}
          My Cart
        </Typography>

        <CartTable
          ProductsInfo={ProductsInfo}
          removeFromCart={removeFromCart}
        />

        {TotalPrice > 0 ? (
          <React.Fragment>
            <Typography className={styles.total} component="h2" variant="h5">
              Total Amount: ${TotalPrice}
            </Typography>
            <div className={styles.paypal}>
              <Paypal
                totalPrice={TotalPrice}
                onSuccess={transactionSuccess}
                transactionError={transactionError}
                transactionCanceled={transactionCanceled}
              />
            </div>
          </React.Fragment>
        ) : ShowSuccess ? (
          <Result
            status="success"
            title="Successfully Purchased Items"
          ></Result>
        ) : (
          <Empty className="mt-4" description="No Items In Cart"></Empty>
        )}
      </MainContainer>
    </div>
  );
}

export default Cart;
