import React, { useEffect, useState } from "react";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";

function SingleUser(props) {
  const userId = props.match.params.userId;
  const [User, setUser] = useState({});

  useEffect(() => {
    http
      .get(`${apiUrl}/admin/all-users/user_by_id?id=${userId}`)
      .then((response) => setUser(response.data));
  }, []);

  return <div>single user</div>;
}

export default SingleUser;
