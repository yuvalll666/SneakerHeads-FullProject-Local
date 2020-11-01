import React, { useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  Button,
} from "@material-ui/core";
import { Empty } from "antd";
import { Link } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.common.white,
  },
}))(TableCell);

function HistoryTable({ history }) {
  console.log(history);
  const getDate = (date) => {
    let newDate = new Date(date);
    let yy = newDate.getFullYear();
    let mm = newDate.getMonth() + 1;
    if (mm < 10) {
      mm = "0" + mm;
    }
    let dd = newDate.getDate();
    if (dd < 10) {
      dd = "0" + dd;
    }
    let hh = newDate.getHours();
    let sec = newDate.getSeconds();
    let min = newDate.getMinutes();

    let formatedDate = `${yy}-${mm}-${dd} ${hh}:${min}:${sec}`;

    return formatedDate ? formatedDate : null;
  };

  useEffect(() => {}, [history]);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-success">
              <StyledTableCell align="left">Payment ID</StyledTableCell>
              <StyledTableCell align="left">Product Name</StyledTableCell>
              <StyledTableCell align="left">Quantity</StyledTableCell>
              <StyledTableCell align="left">Price / per 1</StyledTableCell>
              <StyledTableCell align="left">Date Of Purchase</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item, index) => (
              <TableRow
                key={index}
                className={index % 2 ? "bg-light" : "bg-white"}
              >
                <TableCell align="left">{item.paymentId}</TableCell>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="left">${item.price}</TableCell>
                <TableCell align="left">
                  {getDate(item.dateOfPurchase)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {history.length < 1 && (
        <React.Fragment>
          <Empty
            className="mt-4"
            description="Did not purchase any items yet"
          ></Empty>
          <div className="row justify-content-center">
            <div className="mt-4 justify-content-center col-6">
              <Link to="/products">
                <Button
                  fullWidth
                  size="large"
                  color="primary"
                  variant="outlined"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default HistoryTable;
