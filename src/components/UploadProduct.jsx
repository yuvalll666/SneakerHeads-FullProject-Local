import React, { useState, useContext } from "react";
import MainContainer from "./forms/MainContainer";
import Form from "./forms/Form";
import Input from "./forms/Input";
import PrimaryButton from "./forms/PrimaryButton";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import FileUpload from "./utils/FileUpload";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../App";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const useStyles = makeStyles((them) => ({
  root: {
    marginTop: them.spacing(0),
  },
}));

function UploadProduct() {
  const user = useContext(UserContext);
  const styles = useStyles();
  const history = useHistory();

  const brands = [
    { key: 1, value: "NIKE" },
    { key: 2, value: "ADIDAS" },
    { key: 3, value: "VANS" },
    { key: 4, value: "CONVERS" },
    { key: 5, value: "NB" },
  ];
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const [images, setImages] = useState([]);
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = async (data) => {
    const { title, description, price, brand } = data;
    if (!title || !description || !price || !brand || !images) {
      return alert("Please fill of fields first!");
    }
    const productInfo = {
      writer: user._id,
      images: images,
      ...data,
    };

    try {
      console.log("aaaaaa");
      await http.post(`${apiUrl}/products/uploadProduct`, productInfo);
      console.log("bbbbbb");
      alert("Product uploaded successfuly");
      history.push("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div>
      <Typography className="text-center mt-4 mb-4" component="h2" variant="h5">
        Upload Product
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileUpload refreshFunction={updateImages} />
        <MainContainer className={styles.root} maxWidth="sm">
          <Input name="title" label="Title" id="title" ref={register} />
          <textarea
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

            {brands.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <Input
            name="price"
            label="Price"
            id="price"
            placeholder="Product Price ( $ )"
            type="number"
            ref={register}
          />
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </MainContainer>
      </Form>
    </div>
  );
}

export default UploadProduct;
