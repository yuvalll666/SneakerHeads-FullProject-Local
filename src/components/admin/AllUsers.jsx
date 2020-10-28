import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useToasts } from "react-toast-notifications";
import { Redirect } from "react-router-dom";
import http from "../../services/httpService";
import { apiUrl, userRole } from "../../config.json";
import PageHeader from "../utils/PageHeader";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  withStyles,
  Button,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDeletedUser } from "../../DeletedUserContext";
const { ADMIN } = userRole;

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.common.white,
  },
}))(TableCell);

function AllUsers() {
  const { DeletedUser, setDeletedUser } = useDeletedUser();
  const { addToast } = useToasts();
  const user = useContext(UserContext);
  const [Users, setUsers] = useState([]);
  const history = useHistory();
  useEffect(() => {
    http
      .get(`${apiUrl}/admin/getAllUsers`)
      .then((response) => {
        if (response && response.data.success) {
          setUsers(response.data.users);
        } else {
          addToast("Could not fetch users from database", {
            appearance: "error",
          });
        }
      })
      .catch((error) => {
        addToast("There was a problem with the server", {
          appearance: "error",
        });
        console.log(error);
      });
  }, []);

  const handleClick = (userId) => {
    history.push(`/admin/all-users/${userId}`);
  };

  const undoDelete = (DeletedUser) => {
    http
      .post(`${apiUrl}/admin/all-users/undoDelete`, DeletedUser)
      .then((response) => {
        let user = response.data;
        addToast("User restored successfully", {
          appearance: "success",
        });
        history.push(`/admin/all-users/${user._id}`);
        setDeletedUser(false);
      })
      .catch((error) => {
        addToast("Error: Could't restore user", { appearance: "error" });
      });
  };
  console.log(user);
  if (user && user.role !== ADMIN) {
    console.log("koko");
    return <Redirect to="/" />;
  }
  return (
    <div>
      <PageHeader>All Users</PageHeader>
      <div className="container-fluid">
        {DeletedUser && DeletedUser._id && (
          <Link onClick={() => undoDelete(DeletedUser)}>
            <i className="fas fa-exclamation-circle"></i>Undo Delete
          </Link>
        )}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-info">
                <StyledTableCell align="left">User Role</StyledTableCell>
                <StyledTableCell align="left">User Name</StyledTableCell>
                <StyledTableCell align="left">ID</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Confirmed?</StyledTableCell>
                <StyledTableCell align="left">Handle User</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Users.map((item, index) => (
                <TableRow
                  key={index}
                  className={index % 2 ? "bg-light" : "bg-white"}
                >
                  <TableCell align="left">
                    {item.role === 1 ? (
                      <span className="text-success">EDITOR</span>
                    ) : (
                      <span>Normal</span>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {item.firstName + " " + item.lastName}
                  </TableCell>
                  <TableCell align="left">{item._id}</TableCell>
                  <TableCell align="left">{item.email}</TableCell>
                  <TableCell align="left">
                    {item.confirmed ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      <i className="fas fa-times"></i>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleClick(item._id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AllUsers;
