/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import StraightIcon from "@mui/icons-material/Straight";

function createData(name, cost, percentage, up_down) {
  return { name, cost, percentage, up_down };
}

function rowsup() {
  return [
    createData("Black Lotus", "$50,000", "10%", <StraightIcon />),
    createData("Black Lotus", "$50,000", "10%", <StraightIcon />),
    createData("Black Lotus", "$50,000", "10%", <StraightIcon />),
    createData("Black Lotus", "$50,000", "10%", <StraightIcon />),
  ];
}

export default function DailyCardTable() {
  return (
    <TableContainer
      component={Paper}
      elevation={13}
      // style={{ maxWidth: "100%", overflowX: "auto" }}
    >
      <Table aria-label="simple table">
        <TableBody>
          {rowsup().map((row, index) => (
            <TableRow key={row.name + index}>
              <TableCell>
                <img
                  title="Image title"
                  alt="img"
                  width="47"
                  src="https://images.digimoncard.io/images/cards/BO-115.jpg"
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.cost}</TableCell>
              <TableCell align="right">{row.percentage}</TableCell>
              <TableCell align="right">{row.up_down}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
