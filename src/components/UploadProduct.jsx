import React from "react";
import MainContainer from "./forms/MainContainer";
import Form from "./forms/Form";
import Input from "./forms/Input";
import PrimaryButton from "./forms/PrimaryButton";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";

function UploadProduct() {
  const brands = [
    { key: 1, value: "NIKE" },
    { key: 2, value: "ADIDAS" },
    { key: 3, value: "VANS" },
    { key: 4, value: "CONVERS" },
    { key: 5, value: "NB" },
  ];

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Upload Product
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
      </Form>
    </MainContainer>
  );
}

export default UploadProduct;
