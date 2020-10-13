import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import Form from "./forms/Form";
import MainContainer from "./forms/MainContainer";
import Input from "./forms/Input";
import PrimaryButton from "./forms/PrimaryButton";
import { useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { Button } from "@material-ui/core";

const tokenKey = "token";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is required")
    .min(2, "First name should be a minimum 2 charcters long")
    .max(30, "First name most be shorter then 30 charcters "),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is required")
    .min(2, "Last name should be a minimum 2 charcters long")
    .max(30, "Last name most be shorter then 30 charcters"),
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is required"),
  oldPassword: yup
    .string()
    .min(6, "Passwrod should be a minimum of 6 charcters long"),
  newPassword: yup
    .string()
    .min(6, "Passwrod should be a minimum of 6 charcters long"),
  confirmPassword: yup
    .string()
    .min(6, "Passwrod should be a minimum of 6 charcters long"),
});

const UserPage = () => {
  const [error, setError] = useState({});
  const user = useContext(UserContext);
  const { firstName, lastName, email } = user;
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const changePass = watch("changePass");

  const onSubmit = async (formData) => {
    const { oldPassword, newPassword, confirmPassword } = formData;
    delete formData.changePass;

    if (oldPassword && newPassword !== confirmPassword) {
      setError({ confirmPassword: "Passwords most be the same" });
    } else {
      try {
        const { data } = await http.patch(
          `${apiUrl}/users/${user._id}`,
          formData
        );
        localStorage.setItem(tokenKey, data.token);
        window.location = "/";
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError({ oldPassword: error.response.data });
        }
      }
    }
  };

  const deleteUser = async () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS ACCOUNT? \n Note: this action can not be reversed")) {
      try {
        await http.delete(`${apiUrl}/users/${user._id}`);
        localStorage.removeItem(tokenKey);
        window.location = "/signin";
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("canceled");
    }
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Edit Account
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Input
          ref={register}
          name="firstName"
          type="text"
          label="First Name"
          required
          error={Boolean(errors.firstName)}
          helperText={errors?.firstName?.message}
        />
        <Input
          ref={register}
          name="lastName"
          type="text"
          label="Last Name"
          required
          error={Boolean(errors.lastName)}
          helperText={errors?.lastName?.message}
        />
        <Input
          ref={register}
          name="email"
          type="email"
          label="Email"
          required
          error={Boolean(errors.email)}
          helperText={errors?.email?.message}
        />

        <FormControlLabel
          control={
            <Checkbox color="primary" inputRef={register} name="changePass" />
          }
          label="Would you like to change password ?"
        />
        {changePass && (
          <React.Fragment>
            <Input
              ref={register}
              name="oldPassword"
              type="password"
              label="Old Passwrod"
              required
              error={Boolean(errors.oldPassword) || !!error.oldPassword}
              helperText={errors?.oldPassword?.message || error?.oldPassword}
            />
            <Input
              ref={register}
              name="newPassword"
              type="password"
              label="New Passwrod"
              required
              error={Boolean(errors.newPassword)}
              helperText={errors?.newPassword?.message}
            />
            <Input
              ref={register}
              name="confirmPassword"
              type="password"
              label="Confirm Passwrod"
              required
              error={Boolean(errors.confirmPassword) || !!error.confirmPassword}
              helperText={
                errors?.confirmPassword?.message || error?.confirmPassword
              }
            />
          </React.Fragment>
        )}
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </Form>
      <Button
        style={{ marginTop: "100px" }}
        color="secondary"
        variant="outlined"
        size="small"
        onClick={deleteUser}
      >
        Delete Account
      </Button>
    </MainContainer>
  );
};

export default UserPage;
