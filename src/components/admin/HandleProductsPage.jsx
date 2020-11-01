import React, { useState, useEffect, useContext, createContext } from "react";
import http from "../../services/httpService";
import { apiUrl, userRole } from "../../config.json";
import { UserContext } from "../../App";
import { Redirect, Link, useHistory, Route } from "react-router-dom";
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
import UpdateProduct from "./UpdateProduct";
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

function HandleProductsPage(props) {
  const history = useHistory();
  const styles = useStyles();
  const user = useContext(UserContext);
  const [Products, setProducts] = useState([]);
  const [DeletedProduct, setDeletedProduct] = useState({});
  const { addToast } = useToasts();
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
  useEffect(() => {}, [Products]);

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

  const handleUpdate = (productId) => {
    return history.push(`/update-product/${productId}`);
  };

  const handleDelete = (productId) => {
    const confirm = window.confirm("Would you like to delete this product?");
    if (confirm) {
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
    }
  };

  const undoDelete = (DeletedProduct) => {
    http
      .post(`${apiUrl}/admin/handle-products/undoDelete`, DeletedProduct)
      .then((response) => {
        let product = response.data;
        addToast("Product restored successfully", {
          appearance: "success",
        });
        setDeletedProduct(false);
        setProducts([...Products, product]);
        window.location = "/handle-products";
      })
      .catch((error) => {
        addToast("Error: Could't restore Product", { appearance: "error" });
      });
  };

  const handleBrandFilter = (brandId) => {
    http
      .get(`${apiUrl}/admin/handle-products/getAllProducts?filter=${brandId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buttons = brands.map((brand) => {
    return (
      <Button
        onClick={() => handleBrandFilter(brand._id)}
        color="default"
        variant="contained"
      >
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
        <div className="d-flex flex-md-row flex-lg-row flex-xl-row flex-column justify-content-between mb-4">
          <Button
            onClick={() => handleBrandFilter("all")}
            color="default"
            variant="contained"
          >
            all brands
          </Button>

          {buttons}
        </div>
        {DeletedProduct && DeletedProduct._id && (
          <Link to="#" onClick={() => undoDelete(DeletedProduct)}>
            <i className="fas fa-exclamation-circle"></i>Undo Delete
          </Link>
        )}
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
