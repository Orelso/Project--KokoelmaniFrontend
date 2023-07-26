/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Paper, TableBody } from "@mui/material";
import * as React from "react";
import { Table, TableCell, TableContainer, TableRow } from "@mui/material";
import type { AnyCard } from "../../../../types";
import { MODIFIED_VALUES } from "./searchBarUtils";

export function SearchResult({
  handleCardClick,
  result,
  getTableValue,
}: {
  result: AnyCard;
  handleCardClick: (event: any) => void;
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
              {result.title}{" "}
              {typeof result.series === "object" ? "" : result.series}
            </TableCell>
            <TableCell>{result.lang && MODIFIED_VALUES[result.lang]}</TableCell>
            <TableCell style={{ border: result.set ? "" : "none" }}>
              {result.set ? result.set.name : null}
            </TableCell>
            <TableCell style={{ border: result.set ? "" : "none" }}>
              {result.set ? result.set.series : null}
            </TableCell>

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
              {result.card_faces && result.card_faces.length > 1 ? (
                <div style={{ display: "flex" }}>
                  {Array.isArray(result.card_faces) &&
                    result.card_faces.map(
                      (
                        face: { image_uris: { small: string } },
                        index: React.Key
                      ) => (
                        <img
                          key={index}
                          title="Click Me"
                          alt=""
                          width="47"
                          height="0"
                          src={face.image_uris?.small}
                        />
                      )
                    )}
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
                    result.token_name ||
                    (result.images &&
                      result.images[0]?.path +
                        "." +
                        result.images[0].extension) ||
                    result.resourceURI
                  }
                />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
