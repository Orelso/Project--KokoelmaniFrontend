import React, { useEffect, useState } from 'react'
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Typography, Card } from '@mui/material'
import { makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import StraightIcon from '@mui/icons-material/Straight';
import axios from 'axios';




function createData(name: any, cost: any, percentage: any, up_down: any) {
    return { name, cost, percentage, up_down };
  }
  

function rowsup(){
     return [
    createData('Black Lotus', '$50,000', '10%',<StraightIcon /> ),
    createData('Black Lotus', '$50,000', '10%',<StraightIcon /> ),
    createData('Black Lotus', '$50,000', '10%',<StraightIcon /> ),
    createData('Black Lotus', '$50,000', '10%',<StraightIcon /> ),
  ]}

  // const oneCard = ({
  //   name,
  //   capital,
  //   languages,
  //   flags,
  //   coatOfArms,
  //   maps,
  // })



export default function DailyCardTable() {
  // const [digimon, setDigimon] = useState([])

  // useEffect(() => {
  //   console.log("It started");
  //   axios.get("https://images.digimoncard.io/images/cards/BO-115.jpg").then((response) => {
  //     console.log("promise fulfilled", response.data);
  //     setDigimon(response.data);
  //   });
  // }, [digimon]);

    return (
        <TableContainer component={Paper} elevation={13} sx={{overflow: "hidden" }}> 
        <Table aria-label="simple table">
          {/* <TableHead>
              <TableCell>MTG</TableCell>
          </TableHead> */}
          <TableBody>
          {rowsup().map((row, index) => (
            <TableRow
              key={row.name + index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
                <TableCell>
               <img 
                  title="Image title"
                  alt="img"
                  width="47"
                  src="https://images.digimoncard.io/images/cards/BO-115.jpg"
                ></img>
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
    )
  }
