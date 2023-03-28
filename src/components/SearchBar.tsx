import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import { useAtom } from "jotai";
import { searchResultsAtom } from "../store";
import { Table } from "@mui/material";
import { Paper } from "@mui/material";
import { Modal } from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { height } from "@mui/system";

const FilterCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const [selectedCard, setSelectedCard] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
    console.log("🚀 ~ file: SearchBar.tsx:29 ~ handleOnChange ~ value", value);
  };

  const handleSubmit = () => {
    fetch(`http://localhost:5051/api/v1/all/cards/name/${searchTerm}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(
          "🚀 ~ file: SearchBar.tsx:25 ~ .then ~ data",
          res,
          typeof res !== "undefined" && "data" in res ? res.data : null
        );
        setSearchResults(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <FilterCardStyles>
      <TextField
        sx={{ ml: 1, flex: 1, color: "white" }}
        placeholder="Search..."
        onChange={handleOnChange}
        value={searchTerm}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSubmit}>
              <SearchIcon />
            </IconButton>
          ),
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // prevent the default behavior of the enter key
            handleSubmit();
          }
        }}
      />

      {searchResults.slice(0, 5).map((result, index) => {
        return (
          <TableContainer
            key={index}
            component={Paper}
            elevation={13}
            sx={{ overflow: "hidden" }}
          >
            <Table aria-label="simple table">
              <TableRow onClick={() => handleCardClick(result)}>
                <TableCell>{result.name}</TableCell>
                <TableCell>{result.mana_cost}</TableCell>
                <TableCell>{result.lang}</TableCell>
                <TableCell>{result.artist}</TableCell>
              </TableRow>
              <TableRow onClick={() => handleCardClick(result)}>
                <TableCell>
                  <img
                    title="Image title"
                    alt="img"
                    width="47"
                    src={
                      result.image_uris?.small ||
                      result.image_url ||
                      result.images?.small ||
                      result.card_images[0].image_url_small
                    }
                    onClick={() => handleCardClick(result)}
                  />
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        );
      })}

      {selectedCard && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={selectedCard.image_uris?.normal || selectedCard.image_url}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" sx={{ color: "red" }}>
              {/* Digimon */}
              {selectedCard.name}
              {selectedCard.type}
              {selectedCard.color}
              {selectedCard.stage}
              {selectedCard.digi_type}
              {selectedCard.attribute}
              {selectedCard.level}
              {selectedCard.play_cost}
              {selectedCard.evolution_cost}
              {selectedCard.cardrarity}
              {selectedCard.artist}
              {selectedCard.dp}
              {selectedCard.cardnumber}
              {selectedCard.maineffect}
              {selectedCard.set_name}
              {selectedCard.card_sets}
              {selectedCard.img_url}
              {selectedCard.set_name}

              {/* Pokemon */}
            </Typography>
          </Box>
        </Modal>
      )}
    </FilterCardStyles>
  );
};

const FilterCardStyles = styled.div`
  max-width: 600px;
  width: 90vw;
  margin: auto;
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  marginT &:hover {
    transform: scale(1.05);
  }
  .MuiTextField-root {
    align-items: center;
    width: 100%;
  }
  .MuiInputBase-input {
    width: 50vw;
  }
`;

export default FilterCard;
