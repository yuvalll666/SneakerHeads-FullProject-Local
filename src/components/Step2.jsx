import React from "react";
import Form from "../components/forms/Form";
import MainContainer from "../components/forms/MainContainer";
import Typography from "@material-ui/core/Typography";
import Input from "../components/forms/Input";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useData } from "../DataContext";
import PrimaryButton from "./forms/PrimaryButton";

function Step2() {
  const { data, setValues } = useData();
  const history = useHistory();
  const [register, handleSubmit, errors] = useForm({
    defaultValues: {
      email: data.email,
      password: data.password,
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    history.push("/signin");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit(data))}>
        <Input
          ref={register}
          type="email"
          label="Email"
          name="email"
          required
        />
        <Input
          ref={register}
          type="password"
          label="Password"
          name="password"
          required
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </Form>
    </MainContainer>
  );
}

export default Step2;
