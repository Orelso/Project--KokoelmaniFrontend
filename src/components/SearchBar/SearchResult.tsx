import { Paper, TableBody } from "@mui/material";
import * as React from "react";
import { Table, TableCell, TableContainer, TableRow } from "@mui/material";
import type { AnyCard } from "../../types";
import { MODIFIED_VALUES } from "./searchBarUtils";


export function SearchResult({
  handleCardClick,
  result,
  getTableValue,
}: {
  result: AnyCard;
  handleCardClick: (event) => void;
  getTableValue: (mana_cost: string) => any;
}) {
  return (
    <TableContainer
      component={Paper}
      elevation={13}
      sx={{
        overflow: "hidden",
      }}
    >
      <Table aria-label="simple table">
        <TableBody>
          <TableRow
            onClick={() => handleCardClick(result)}
            sx={{
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
            <TableCell>
              {result.name} {result.token_name} {result.title}
            </TableCell>

            <TableCell>
              {/* Mana Cost */}
              {result.mana_cost && getTableValue(String(result.mana_cost))}
              {/* Games */}
              {result.released}
              {/* Funko Pop */}
              {result.title} {typeof result.series === 'object' ? '' : result.series}
            </TableCell>
            <TableCell>{result.lang && MODIFIED_VALUES[result.lang]}</TableCell>
            {/* <TableCell>{result.set}</TableCell> */}
            {/* MTG POKEMON */}
            <TableCell>{result.artist}</TableCell>
            <TableCell>{result.rarity}</TableCell>
            <TableCell>{result.types}</TableCell>
            {/* YUGIOH */}
            <TableCell>{result.type}</TableCell>
            <TableCell>{result.attribute}</TableCell>
            {/* DIGIMON */}
            <TableCell>{result.color}</TableCell>
            <TableCell>{result.set_name}</TableCell>
          </TableRow>
          <TableRow onClick={() => handleCardClick(result)}>
            <TableCell>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {result.card_faces && result.card_faces.length > 1 ? (
                <div style={{ display: "flex" }}>
                  {result.card_faces.map((face, index) => (
                    <img
                      key={index}
                      title="Click Me"
                      alt=""
                      width="47"
                      height="0"
                      src={face.image_uris?.small}
                      onClick={() => handleCardClick(result)}
                    />
                  ))}
                </div>
              ) : (
                <img
                  title="Click Me"
                  alt=""
                  width="47"
                  height="0"
                  src={
                    result.image_uris?.small ||
                    result.image_url ||
                    result.images?.small ||
                    result.card_images?.[0]?.image_url_small ||
                    result.imageName ||
                    result.background_image ||
                    result.token_name
                  }
                  onClick={() => handleCardClick(result)}
                />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
