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
} from "@material-ui/core";

function SingleUser(props) {
  const userId = props.match.params.userId;
  const [User, setUser] = useState({});
  const { addToast } = useToasts();

  let entries = Object.entries(User);

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
                  <TableCell>Field</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{view}</TableBody>
            </Table>
          </TableContainer>
          <div style={{width: "100%"}} className="mt-4 d-flex justify-content-between">
            <Button color="primary" variant="contained">
              Make Editor
            </Button>
            <Button color="default" variant="contained">
              Make Normal
            </Button>
          </div>
            <Button style={{marginTop: "50px"}} color="secondary" variant="contained">
              Delete User
            </Button>
        </MainContainer>
      </div>
    </div>
  );
}

export default SingleUser;
