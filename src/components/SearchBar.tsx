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

  // TODO DANIEL
  const handleCardClick = (card: React.SetStateAction<any>) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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

              {/* MTG */}
              {selectedCard.id}
              {selectedCard.oracle_id}
              {selectedCard.multiverse_ids}
              {selectedCard.mtgo_id}
              {selectedCard.mtgo_foil_id}
              {selectedCard.tcgplayer_id}
              {selectedCard.cardmarket_id}
              {selectedCard.name}
              {selectedCard.lang}
              {selectedCard.released_at}
              {selectedCard.uri}
              {selectedCard.scryfall_uri}
              {selectedCard.layout}
              {selectedCard.highres_image}
              {selectedCard.image_status}
              //TODO ask DANIEL
              {/* {selectedCard.image_uris.small}
              {selectedCard.image_uris.normal}
              {selectedCard.image_uris.large}
              {selectedCard.image_uris.png}
              {selectedCard.image_uris.art_crop}
              {selectedCard.image_uris.border_crop} */}
              {selectedCard.mana_cost}
              {selectedCard.cmc}
              {selectedCard.type_line}
              {selectedCard.oracle_text}
              {selectedCard.power}
              {selectedCard.toughness}
              {selectedCard.colors}
              {selectedCard.color_identity.}
              {selectedCard.keywords}
              // TODO
              {/* {selectedCard.legalities.standard}
              {selectedCard.legalities.future}
              {selectedCard.legalities.historic}
              {selectedCard.legalities.gladiator}
              {selectedCard.legalities.pioneer}
              {selectedCard.legalities.explorer}
              {selectedCard.legalities.modern}
              {selectedCard.legalities.legacy}
              {selectedCard.legalities.pauper}
              {selectedCard.legalities.vintage}
              {selectedCard.legalities.penny}
              {selectedCard.legalities.commander}
              {selectedCard.legalities.brawl}
              {selectedCard.legalities.historicbrawl}
              {selectedCard.legalities.alchemy}
              {selectedCard.legalities.paupercommander}
              {selectedCard.legalities.duel}
              {selectedCard.legalities.oldschool}
              {selectedCard.legalities.premodern} */}
              // TODO
              {/* {selectedCard.games[0]}
              {selectedCard.games[1]} */}
              {selectedCard.reserved}
              {selectedCard.foil}
              {selectedCard.nonfoil}
              {/* {selectedCard.finishes[0]}
              {selectedCard.finishes[1]} */}
              {selectedCard.oversized}
              {selectedCard.promo}
              {selectedCard.reprint}
              {selectedCard.variation}
              {selectedCard.set_id}
              {selectedCard.set}
              {selectedCard.set_name}
              {selectedCard.set_type}
              {selectedCard.set_uri}
              {selectedCard.set_search_uri}
              {selectedCard.scryfall_set_uri}
              {selectedCard.rulings_uri}
              {selectedCard.prints_search_uri}
              {selectedCard.collector_number}
              {selectedCard.digital}
              {selectedCard.rarity}
              {selectedCard.flavor_text}
              {selectedCard.card_back_id}
              {selectedCard.artist}
              {/* {selectedCard.artist_ids} */}
              {selectedCard.illustration_id}
              {selectedCard.border_color}
              {selectedCard.frame}
              {selectedCard.full_art}
              {selectedCard.textless}
              {selectedCard.booster}
              {selectedCard.story_spotlight}
              {selectedCard.edhrec_rank}
              {selectedCard.penny_rank}
              {/* {selectedCard.prices.usd}
              {selectedCard.prices.usd_foil}
              {selectedCard.prices.usd_etched}
              {selectedCard.prices.eur}
              {selectedCard.prices.eur_foil}
              {selectedCard.prices.tix} */}
              {selectedCard.related_uris.gatherer}
              {selectedCard.related_uris.tcgplayer_infinite.articles}
              {selectedCard.related_uris.tcgplayer_infinite_decks}
              {selectedCard.related_uris.edhrec}
              {selectedCard.related_uris.tcgplayer_infinite_decks}
              {selectedCard.foil}
              {selectedCard.foil}
              {selectedCard.foil}
              {selectedCard.foil}
              {selectedCard.foil}
              {selectedCard.foil}
              {selectedCard.foil}
              {selectedCard.foil}
              {selectedCard.foil}

            </Typography>
          </Box>
        </Modal>
      )}
    </FilterCardStyles>
    </>
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
