import React, { useEffect, useState } from "react";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import { useToasts } from "react-toast-notifications";
import PageHeader from "../utils/PageHeader";
import MainContainer from "../forms/MainContainer";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  withStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { userRole } from "../../config.json";
const { EDITOR, NORMAL } = userRole;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#e0e0e0",
  },
}))(TableCell);

function SingleUser(props) {
  const history = useHistory();
  const url = `${apiUrl}/admin/all-users`;
  const userId = props.match.params.userId;
  const [User, setUser] = useState({});
  const { addToast } = useToasts();

  let entries = Object.entries(User);

  useEffect(() => {
    http
      .get(`${url}/user_by_id?id=${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => {
        if (error) {
          addToast("Error: Could't fetch user data from the server", {
            appearance: "error",
          });
        }
      });
  }, []);
  useEffect(() => {}, [User]);

  const makeEditor = (userId) => {
    if (User.role === EDITOR) {
      return addToast("This user is already an EDITOR", { appearance: "info" });
    }
    const confirmed = window.confirm(
      "Are you sure you want to make this user an Editor?\nDoing so will allow this user to make changes throughout your application!"
    );
    if (confirmed) {
      http
        .post(`${url}/makeEditor?id=${userId}`)
        .then((response) => {
          history.push("/admin/all-users");
          addToast("User have been promoted to EDITOR", {
            appearance: "success",
          });
        })
        .catch((error) => {
          addToast("Error: Could't update user");
        });
    }
  };

  const makeNormal = () => {
    if (User.role === NORMAL) {
      return addToast("This user is already a NORMAL user", { appearance: "info" });
    }
    const confirmed = window.confirm(
      "Are you sure you want to make this user a NORMAL user?\nDoing so will take away all of this user authorities!"
    );
    if (confirmed) {
      http
        .post(`${url}/makeNormal?id=${userId}`)
        .then((response) => {
          history.push("/admin/all-users");
          addToast("User have been demoted to NORMAL", {
            appearance: "success",
          });
        })
        .catch((error) => {
          addToast("Error: Could't update user");
        });
    }
  };

  const handleDelete = () => {
    http.delete(`${url}/deleteUser?id=${userId}`);
  };

  const view = entries.map((entry) => {
    if (entry[1] === 1) {
      entry[1] = "Editor";
    } else if (entry[1] === 0) {
      entry[1] = "Normal";
    }

    return (
      <TableRow key={entry[0]}>
        <TableCell>{entry[0]}</TableCell>
        <TableCell>{entry[1]}</TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      <PageHeader>Handle User</PageHeader>

      <div className="container">
        <MainContainer>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Field</StyledTableCell>
                  <StyledTableCell>Value</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>{view}</TableBody>
            </Table>
          </TableContainer>
          <div
            style={{ width: "100%" }}
            className="mt-4 d-flex justify-content-between"
          >
            <Button
              onClick={() => makeEditor(userId)}
              color="primary"
              variant="contained"
            >
              Make Editor
            </Button>
            <Button
              onClick={() => makeNormal(userId)}
              color="default"
              variant="contained"
            >
              Make Normal
            </Button>
          </div>
          <Button
            onClick={() => handleDelete(userId)}
            style={{ marginTop: "50px" }}
            color="secondary"
            variant="contained"
          >
            Delete User
          </Button>
        </MainContainer>
      </div>
    </div>
  );
}

export default SingleUser;
