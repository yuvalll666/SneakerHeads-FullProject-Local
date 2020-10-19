import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import MainContainer from "./forms/MainContainer";
import { Empty, Result } from "antd";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
}))(TableCell);

const useStyles = makeStyles((them) => ({
  total: {
    alignSelf: "start",
    marginTop: them.spacing(4),
  },
  productImage: {
    width: "100px",
  },
}));

function Cart() {
  const styles = useStyles();
  const user = useContext(UserContext);
  const { cart } = user;
  const [ProductsInfo, setProductsInfo] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);

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
    console.log(ProductsInfo);
    if (ProductsInfo.length > 0) {
      totalSum(ProductsInfo);
    }
  }, [ProductsInfo]);

  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:3000/${image}`;
    }
  };

  const totalSum = (productsInfo) => {
    let total = 0;
    console.log(productsInfo);
    productsInfo.map((item) => {
      console.log(item);
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotalPrice(total);
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Product Image</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Remove From Cart</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ProductsInfo.map((prod, index) => (
                <TableRow
                  key={index}
                  // className={index % 2 ? "bg-light" : "bg-white"}
                >
                  <TableCell>
                    <img
                      src={renderCartImage(prod.images)}
                      alt="productImage"
                      className={styles.productImage}
                    />
                  </TableCell>
                  <TableCell>{prod.quantity}</TableCell>
                  <TableCell>{prod.price}</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography className={styles.total} component="h2" variant="h5">
          Total Amount: ${TotalPrice}
        </Typography>
        <Result status="success" title="Successfully Purchased Items"></Result>
        <Empty description="No Items In Cart"></Empty>
      </MainContainer>
    </div>
  );
}

export default Cart;
