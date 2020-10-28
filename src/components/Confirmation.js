import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";

function Confirmation() {
  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(() => {
    addToast("User have been confirmed!", { appearance: "success" });
    history.push("/signin");
    // setInterval(() => {
    //   window.location = "/signin";
    // }, 3000);
  }, []);

  return null;
}

export default Confirmation;
