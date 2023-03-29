import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import styled from "styled-components";
import { useAtom } from "jotai";
import { searchResultsAtom } from "../store";
import { Paper } from "@mui/material";
import { Modal } from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

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

  // TODO DANIEL
  const handleCardClick = (card: React.SetStateAction<any>) => {
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
              display: "absolute",
              flexDirection: "column",
              alignItems: "center",
              border: "10px solid purple",
              height: "100%",
              backgroundColor: "white",
              overflow: "hidden",
            }}
          >
            {/*-- Modal close button --*/}
            <IconButton
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            {/*-- Container for image and table --*/}
            <img
              src={selectedCard.image_uris?.normal || selectedCard.image_url}
              style={{ border: "8px solid black" }}
            />
            <TableContainer
              sx={{ width: "20%", height: "500px", overflow: "auto" }}
            >
              <Table sx={{ border: "2px solid green" }}>
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Field</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody sx={{ border: "2px solid orange" }}>
                  <TableRow>
                    <TableCell sx={{ border: "2px solid green" }}>
                      Name
                    </TableCell>
                    <TableCell>{selectedCard.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>{selectedCard.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Color</TableCell>
                    <TableCell>{selectedCard.color}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Stage</TableCell>
                    <TableCell>{selectedCard.stage}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Digimon Type</TableCell>
                    <TableCell>{selectedCard.digi_type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Attribute</TableCell>
                    <TableCell>{selectedCard.attribute}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Level</TableCell>
                    <TableCell>{selectedCard.level}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Play Cost</TableCell>
                    <TableCell>
                      {selectedCard.play_cost || selectedCard.mana_cost}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Evolution Cost</TableCell>
                    <TableCell>{selectedCard.evolution_cost}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Card Rarity</TableCell>
                    <TableCell>{selectedCard.cardrarity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Artist</TableCell>
                    <TableCell>{selectedCard.artist}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>DP</TableCell>
                    <TableCell>{selectedCard.dp}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Card Number</TableCell>
                    <TableCell>{selectedCard.cardnumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Main Effect</TableCell>
                    <TableCell>{selectedCard.maineffect}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Soure Effect</TableCell>
                    <TableCell>{selectedCard.soureeffect}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Set Name</TableCell>
                    <TableCell>{selectedCard.set_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Card Sets</TableCell>
                    <TableCell>{selectedCard.card_sets}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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
  // TODO DANIEL
  /* .too {
    border: 2px solid green;
  }
  .too2 {
    border: 2px solid red;
  } */
`;

export default FilterCard;
