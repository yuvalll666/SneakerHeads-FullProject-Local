import React from "react";
import Form from "../components/forms/Form";
import MainContainer from "../components/forms/MainContainer";
import Typography from "@material-ui/core/Typography";
import Input from "../components/forms/Input";

function Step2() {
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 2
      </Typography>
      <Form>
        <Input type="email" label="Email" name="email" required />
      </Form>
    </MainContainer>
  );
}

export default Step2;
