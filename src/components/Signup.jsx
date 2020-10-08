import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function Signup() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    history.push("/");
  };

  return (
    <div>
      <h2 className="mt-4">Sign Up (step 1)</h2>
      <form className="mt-4">
        <input
          ref={register}
          name="firstName"
          type="text"
          placeholder="First Name"
        />
        <input
          ref={register}
          name="lastName"
          type="text"
          placeholder="Last Name"
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default Signup;
