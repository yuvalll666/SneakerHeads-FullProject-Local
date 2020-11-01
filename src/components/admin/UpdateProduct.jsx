import React, { useState, useContext, useEffect } from "react";
import MainContainer from "../forms/MainContainer";
import Form from "../forms/Form";
import Input from "../forms/Input";
import PrimaryButton from "../forms/PrimaryButton";
import { useForm } from "react-hook-form";
import FileUpload from "../utils/FileUpload";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../App";
import http from "../../services/httpService";
import { apiUrl, userRole } from "../../config.json";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import PageHeader from "../utils/PageHeader";
import { brands } from "../../datas";
import { useToasts } from "react-toast-notifications";
import UploadProduct from "../UploadProduct";

const useStyles = makeStyles((them) => ({
  root: {
    marginTop: them.spacing(0),
  },
}));
function UpdateProduct(props) {
  const productId = props.match.params.productId;
  const { addToast } = useToasts();
  const user = useContext(UserContext);
  const styles = useStyles();
  const history = useHistory();
  const [Chips, setChips] = useState([]);
  const [images, setImages] = useState([]);
  const [Product, setProduct] = useState({});

  useEffect(() => {
    http
      .get(`${apiUrl}/admin/update-product/product_by_id?id=${productId}`)
      .then((response) => {
        if (response && response.data) {
          setProduct(response.data);
          setImages(response.data.images);
          setChips(response.data.tags);
        }
      })
      .catch((error) => {
        addToast("Error: Couldn't fetch product from the server", {
          appearance: "error",
        });
      });
  }, []);

  const { register, handleSubmit } = useForm({
    mode: "onBlur",
  });

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = async (data) => {
    const { title, description, price, brand } = data;
    if (!title || !description || !price || isNaN(brand) || !images) {
      return addToast("Please fill all of the fields first!", {
        appearance: "error",
      });
    }

    const productInfo = {
      writer: user._id,
      images: images,
      tags: Chips,
      ...data,
    };

    console.log(productInfo);

    console.log(productInfo);

    try {
      await http.put(
        `${apiUrl}/admin/update-product/product_by_id?id=${productId}`,
        productInfo
      );
      addToast("Product updated successfuly", {
        appearance: "success",
      });
      history.push("/handle-products");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        addToast(error.response.data.error, {
          appearance: "success",
        });
      }
    }
  };

  const handleChange = (chips) => {
    setChips(chips);
  };

  const renderBrands = () => {
    let array = brands.map((item) => {
      if (item._id === Product.brand) {
        return (
          <option selected="selected" key={item._id} value={item._id}>
            {item.name}
          </option>
        );
      } else {
        return (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        );
      }
    });
    return array;
  };

  return (
    <div>
      <PageHeader>
        Update Product <SystemUpdateAltIcon fontSize="inherit" />
      </PageHeader>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileUpload oldImages={images} refreshFunction={updateImages} />
        <MainContainer className={styles.root} maxWidth="sm">
          <input
            defaultValue={Product.title}
            placeholder="Title"
            name="title"
            label="Title"
            id="title"
            ref={register}
            className="form-control mb-3"
          />
          <textarea
            defaultValue={Product.description}
            className="form-control"
            name="description"
            id="description"
            placeholder="Prodcut Description"
            cols="50"
            rows="7"
            ref={register}
          />
          <select
            className="form-control mt-3"
            name="brand"
            id="brand"
            ref={register}
          >
            <option>Choose Brand...</option>

            {renderBrands()}
          </select>
          <input
            defaultValue={Product.price}
            className="form-control mt-3"
            name="price"
            label="Price"
            id="price"
            placeholder="Product Price ( $ )"
            type="number"
            ref={register}
          />
          <ChipInput
            defaultValue={Product.tags}
            fullWidth
            placeholder="+Add_Tag"
            onChange={(chips) => handleChange(chips)}
            className="mt-2"
            ref={register}
          />
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </MainContainer>
      </Form>
    </div>
  );
}

export default UpdateProduct;
