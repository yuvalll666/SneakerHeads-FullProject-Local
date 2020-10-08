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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is required")
    .min(2, "First name should be at least 2 charcters long")
    .max(30, "First name most be shorter then 30 charcters "),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is required")
    .min(2, "Last name should be at least 2 charcters long").max(30, "First name most be shorter then 30 charcters"),
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
        <Input
          ref={register}
          name="firstName"
          type="text"
          label="First Name"
          error={Boolean(errors.firstName)}
          helperText={errors?.firstName?.message}
        />
        <Input
          ref={register}
          name="lastName"
          type="text"
          label="Last Name"
          error={Boolean(errors.lastName)}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton type="submit">Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}

export default Signup;
