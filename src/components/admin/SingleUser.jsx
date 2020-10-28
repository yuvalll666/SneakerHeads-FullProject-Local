import React, { useEffect, useState } from "react";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import { useToasts } from "react-toast-notifications";

function SingleUser(props) {
  const userId = props.match.params.userId;
  const [User, setUser] = useState({});
  const { addToast } = useToasts();

  console.log(User)
  useEffect(() => {
    http
      .get(`${apiUrl}/admin/all-users/user_by_id?id=${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => {
        if (error) {
          addToast("Error: Could't fetch user data from the server", {
            appearance: "error",
          });
        }
      });
  }, []);

  return <div>single user</div>;
}

export default SingleUser;
