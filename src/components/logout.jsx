import { useEffect } from "react";
import { logout } from "../services/userService";

function Logout() {
  useEffect(() => {
    logout();
    window.location = "/signin";
  }, []);

  return null;
}

export default Logout;
