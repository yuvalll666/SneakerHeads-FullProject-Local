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
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import PageHeader from "../utils/PageHeader";
import { brands } from "../../datas";
import { useToasts } from "react-toast-notifications";

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
  const [Product, setProduct] = useState({})


  useEffect(() => {
    http.get(`${apiUrl}/update-product` , productId).then(response => {
      setProduct(response.data)
    }).catch(error => {
      addToast("Error: Couldn't fetch product from the server")
    })
  }, [])


  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues:{
      title: "koko"
    }
  });
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = async (data) => {
    const { title, description, price, brand } = data;

    if (!title || !description || !price || !brand || !images) {
      // return toast.error("Please fill of fields first!");
      return addToast("Please fill all of the fields first!", {
        appearance: "error",
      });
      // "Please fill of fields first!"
    }

    const productInfo = {
      writer: user._id,
      images: images,
      tags: Chips,
      ...data,
    };

    try {
      await http.post(`${apiUrl}/products/uploadProduct`, productInfo);
      addToast("Product uploaded successfuly", {
        appearance: "success",
      });
      history.push("/");
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

  return (
    <div>
      <PageHeader>
        Update Product <SystemUpdateAltIcon fontSize="inherit" />
      </PageHeader>

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
              <option key={item.key} value={item._id}>
                {item.name}
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
          <ChipInput
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
