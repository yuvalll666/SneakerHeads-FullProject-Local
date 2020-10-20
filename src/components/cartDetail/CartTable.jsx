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
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MainContainer from "./forms/MainContainer";
import { Empty, Result } from "antd";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
}))(TableCell);


const useStyles = makeStyles((them) => ({
  productImage: {
    width: "100px",
  },
  numbers: {
    fontSize: "1.1em",
    fontFamily: "tahoma",
    fontWeight: 600,
  },
}));

function CartTable(props) {

  const styles = useStyles();
  const user = useContext(UserContext);
  const { cart } = user;
  const [ProductsInfo, setProductsInfo] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);

  return (
          <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Product Image</StyledTableCell>
                <StyledTableCell align="center">Quantity</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">
                  Remove From Cart
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ProductsInfo.map((prod, index) => (
                <TableRow key={index}>
                  <TableCell align="left">
                    <img
                      src={renderCartImage(prod.images)}
                      alt="productImage"
                      className={styles.productImage}
                    />
                  </TableCell>
                  <TableCell className={styles.numbers} align="center">
                    {prod.quantity}
                  </TableCell>
                  <TableCell className={styles.numbers} align="right">
                    ${prod.price}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  )
}

export default CartTable
