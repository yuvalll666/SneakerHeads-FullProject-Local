import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import {
  Typography,
  makeStyles,
  CardContent,
  Card,
  CardActions,
} from "@material-ui/core";
import MainContainer from "./forms/MainContainer";
import { Empty } from "antd";
import CartTable from "./cartDetail/CartTable";
import Paypal from "./utils/Paypal";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((them) => ({
  card: {
    alignSelf: "start",
    marginTop: them.spacing(2),
    background: "whitesmoke",
  },
}));

function Cart() {
  const styles = useStyles();
  const user = useContext(UserContext);
  const { cart } = user;
  const [ProductsInfo, setProductsInfo] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [Quantity, setQuantity] = useState(0);

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
            let arr = cart.map((item) => {
              return item.quantity;
            });

            let reducedNum = arr.reduce((a, b) => a + b, 0);
            setQuantity(reducedNum);

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
        window.location = "/thank-you";
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
        <Typography
          style={{ alignSelf: "start" }}
          className="mb-4"
          component="h1"
          variant="h3"
        >
          Shopping cart 
        </Typography>

        <CartTable
          ProductsInfo={ProductsInfo}
          removeFromCart={removeFromCart}
        />

        {TotalPrice > 0 ? (
          <Card className={styles.card}>
            <CardContent>
              <Typography
                className="d-flex justify-content-between"
                variant="body1"
                component="p"
              >
                <span>
                  Subtotal (
                  {Quantity > 1 ? (
                    <span>{Quantity} items</span>
                  ) : (
                    <span>{Quantity} item</span>
                  )}
                  )
                </span>{" "}
                <span>US ${TotalPrice}</span>
              </Typography>
              <Typography
                className="d-flex justify-content-between"
                variant="body1"
                component="p"
              >
                Shipping <span>Free</span>
              </Typography>
              <hr />
              <div className="d-flex justify-content-between">
                <Typography variant="h5" component="h2">
                  Order total
                </Typography>
                <Typography variant="h6" component="h2">
                  US ${TotalPrice}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <Paypal
                totalPrice={TotalPrice}
                onSuccess={transactionSuccess}
                transactionError={transactionError}
                transactionCanceled={transactionCanceled}
              />
            </CardActions>
          </Card>
        ) : (
          <Empty className="mt-4" description="No Items In Cart"></Empty>
        )}
      </MainContainer>
    </div>
  );
}

export default Cart;
