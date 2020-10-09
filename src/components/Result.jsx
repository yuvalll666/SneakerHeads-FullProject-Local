import Typography from "@material-ui/core/Typography";
import React from "react";
import MainContainer from "./forms/MainContainer";
import { Link } from "react-router-dom";
import { useData } from "../DataContext";
import PrimaryButton from "./forms/PrimaryButton";
import { useHistory } from "react-router-dom";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

function Result() {
  const { data } = useData();
  let entries = Object.entries(data);
  entries.pop();
  
  const history = useHistory();
  const onSubmit = async () => {

  };

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
      <Link to="/step1">Start Over</Link>
    </MainContainer>
  );
}

export default Result;
