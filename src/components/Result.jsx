import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import MainContainer from "./forms/MainContainer";
import { Link } from "react-router-dom";
import { useData } from "../DataContext";
import PrimaryButton from "./forms/PrimaryButton";
import { Redirect, useHistory } from "react-router-dom";
import http from "../services/httpService";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { getCurrentUser } from "../services/userService";

function Result() {
  const { data } = useData();
  let entries = Object.entries(data);
  entries.pop();
  const [error, setError] = useState("");
  const history = useHistory();

  async function onSubmit() {
    try {
      await http.post(`http://localhost:3900/api/users`, data);
      history.push("/step1");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error);
      } else if (error.response && error.response.status === 409) {
        setError(error.response.data.error);
      }
    }
  }
  if (getCurrentUser()) return <Redirect to="/" />;
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        <span role="img" aria-label="clipboard">
          📋
        </span>{" "}
        Result
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry[0]}>
                <TableCell>{entry[0]}</TableCell>
                <TableCell>{entry[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
      {error && (
        <Typography component="div" variant="subtitle1" color="secondary">
          {error}
        </Typography>
      )}
      <Link to="/step1">Start Over</Link>
    </MainContainer>
  );
}

export default Result;
