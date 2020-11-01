import React from "react";
import "../../App.css"

function Form({ children, ...props }) {

  return (
    <form className="out-box" noValidate {...props}>
      {children}
    </form>
  );
}

export default Form;
