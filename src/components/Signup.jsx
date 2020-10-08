import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Form from "./forms/Form";
import MainContainer from "./forms/MainContainer";
import Input from "./forms/Input";
import PrimaryButton from "./forms/PrimaryButton";

function Signup() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    history.push("/");
  };

  return (
    <MainContainer>
      <h2 className="mt-4">Sign Up (step 1)</h2>
      <Form className="mt-4">
        <Input ref={register} name="firstName" type="text" label="First Name" />
        <Input ref={register} name="lastName" type="text" label="Last Name" />
        <PrimaryButton type="submit">Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}

export default Signup;
