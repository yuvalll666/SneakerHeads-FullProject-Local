import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Form from "./forms/Form";
import MainContainer from "./forms/MainContainer";
import Input from "./forms/Input";

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
        <Input
          ref={register}
          name="firstName"
          type="text"
          placeholder="First Name"
        />
        <Input
          ref={register}
          name="lastName"
          type="text"
          placeholder="Last Name"
        />
        <button type="submit">Next</button>
      </Form>
    </MainContainer>
  );
}

export default Signup;
