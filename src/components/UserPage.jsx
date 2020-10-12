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
  const user = useContext(UserContext);
  const { firstName, lastName, email, password } = user;
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

  const onSubmit = async (data) => {
    delete data.changePass;
    console.log(data);
    if (data.oldPassword && data.newPassword !== data.confirmPassword) {
      return console.log("password confirmation false");
    }
    console.log("asdaslkhdkasjhda");
    try {
      console.log(user._id);
      await http.patch(`${apiUrl}/users/${user._id}`, data);
      console.log("i did it ");
    } catch (error) {
      console.log(error.response.data);
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
              error={Boolean(errors.oldPassword)}
              helperText={errors?.oldPassword?.message}
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
              error={Boolean(errors.confirmPassword)}
              helperText={errors?.confirmPassword?.message}
            />
          </React.Fragment>
        )}
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </Form>
    </MainContainer>

    // <div className="container">
    //   <div className="row">
    //     <div className="col-12 mt-4 text-center">
    //       <div className="display-4">Hello, {user.firstName}</div>
    //       <p>Here you can edit your account</p>
    //     </div>
    //   </div>
    //   <div className="row justify-content-center">
    //     <div className="col-lg-4 mt-4 ">
    //       <ul>
    //         <li>{user._id}</li>
    //         <li>Confirmed: {JSON.stringify(user.confirmed)}</li>
    //         <li>
    //           {user.firstName + " " + user.lastName}
    //         </li>
    //         <li>
    //           Role: {user.role}
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UserPage;
