import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
//Components
import Form from "./forms/Form";
import MainContainer from "./forms/MainContainer";
import Input from "./forms/Input";
import PrimaryButton from "./forms/PrimaryButton";
import Typography from "@material-ui/core/Typography";
//Dependcies
import yup from "yup";
import { yupResolver } from "@hookform/resolvers";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9])$/, "First name should not contain numbers")
    .required("First name is required"),
  lastName: yup
    .string()
    .matches(/^([^0-9])$/, "Last name should not contain numbers")
    .required("Last name is required"),
});

function Signup() {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  const onSubmit = (data) => {
    history.push("/");
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Sign Up (step 1)
      </Typography>
      <Form className="mt-4">
        <Input ref={register} name="firstName" type="text" label="First Name" />
        <Input ref={register} name="lastName" type="text" label="Last Name" />
        <PrimaryButton type="submit">Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}

export default Signup;
