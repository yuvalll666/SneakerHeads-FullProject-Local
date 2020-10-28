import React, { useState, useEffect } from "react";
import http from "../../services/httpService";
import { apiUrl, userRole } from "../../config.json";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import PageHeader from "../utils/PageHeader";
import { brands } from "../../datas";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
  Button,
} from "@material-ui/core";
const { ADMIN, EDITOR, NORMAL } = userRole;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#e0e0e0",
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  productImage: {
    width: "100px",
  },
  numbers: {
    fontSize: "1.1em",
    fontWeight: 600,
  },
}));

function HandleProductsPage() {
  const styles = useStyles();
  const user = useContext(UserContext);
  const [Products, setProducts] = useState([]);
  const [DeletedProduct, setDeletedProduct] = useState({});
  const { addToast } = useToasts();
  console.log(Products);
  useEffect(() => {
    http
      .get(`${apiUrl}/admin/handle-products/getAllProducts`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.response);
        addToast("Error: Couldn't fetch products from the server", {
          appearance: "error",
        });
      });
  }, []);

  const renderProductImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:3000/${image}`;
    }
  };

  const view = Products.map((prod, index) => {
    return (
      <TableRow key={index}>
        <TableCell>
          <img
            src={renderProductImage(prod.images)}
            alt="productImage"
            className={styles.productImage}
          />
        </TableCell>
        <TableCell>{prod._id}</TableCell>
        <TableCell>{prod.title}</TableCell>
        <TableCell>{prod.tags}</TableCell>
        <TableCell>
          <Button
            onClick={() => handleUpdate(prod._id)}
            className="mr-2"
            color="primary"
            variant="contained"
          >
            update
          </Button>
          <Button
            onClick={() => handleDelete(prod._id)}
            color="secondary"
            variant="contained"
          >
            delete
          </Button>
        </TableCell>
      </TableRow>
    );
  });

  const handleDelete = (productId) => {
    http
      .delete(`${apiUrl}/admin/handle-products/deleteProduct?id=${productId}`)
      .then((response) => {
        let indexId = Products.map((item) => {
          return item._id;
        }).indexOf(productId);
        Products.splice(indexId, 1);
        setDeletedProduct(response.data);
        addToast("Product deleted successfully", { appearance: "success" });
      })
      .catch((error) => {
        addToast("Error: Couldn't delete product", { appearance: "error" });
      });
  };
  const handleUpdate = () => {};

  const buttons = brands.map((brand) => {
    return (
      <Button color="default" variant="contained">
        {brand.name}
      </Button>
    );
  });

  if (user && user.role === NORMAL) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <PageHeader>Handle Products</PageHeader>

      <div className="container-fluid">
        <div className="d-flex justify-content-between mb-4">{buttons}</div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Products Image</StyledTableCell>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Tags</StyledTableCell>

                <StyledTableCell>Handle Product</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{view}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default HandleProductsPage;
