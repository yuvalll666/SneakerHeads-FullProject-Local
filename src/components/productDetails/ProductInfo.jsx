import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((them) => ({
  root: {
    fontSize:"1.7em",
    fontWeight:600,
    letterSpacing:1.3,
  },
}));

function ProductInfo(props) {
  const { product, addToCart } = props;

  const styles = useStyles();

  const addToCartHandler = () =>{ 
    addToCart(product._id)
  }

  return (
    <div className="row mt-4">
      <div className="col-12 d-lg-flex justify-content-between">
        <div className="col-lg-7">
          <div>
            <span className={styles.root}>
              DESCRIPTION:
            </span>
            <p style={{ letterSpacing: 1.2, fontSize: "1.2em" }}>
              {product.description}{" "}
            </p>
          </div>
        </div>
        <div className="col-lg-4 d-flex flex-column">
          <span className={styles.root}>PRICE: ${product.price}</span>

          <div className="d-flex flex-column">
            <Button onClick={addToCartHandler} variant="contained" color="default">
              <i class="fas fa-plus mr-2"></i> Add to cart
            </Button>
            <Button className="mt-2" variant="contained" color="primary">
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
