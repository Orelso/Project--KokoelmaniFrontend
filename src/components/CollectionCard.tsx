/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { CardMedia, IconButton, Typography } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import styled from "styled-components";
import type { CardCategory } from "../types";

const MAP_COLOR_TO_CATEGORY = {
  Pokemon: "blue",
  MTG: "brown",
  Digimon: "yellow",
  "Yu-Gi-Oh": "purple",
  "other tcg": "orange",
};

interface Props {
  result: any; // Updated prop name
  onDelete?: (id: number) => void;
}

const CollectionCard = ({ result, onDelete }: Props) => {
  return (
    <CollectionCardStyles {...{ category: result.category }}>
      <Card elevation={8}>
        <CardHeader
          action={
            <IconButton onClick={() => onDelete?.(result.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={result.name}
          sx={{ color: "black", textAlign: "center" }}
          subheader={result.category}
        />
        <CardMedia
          component="img"
          height="200"
          image="https://static.cardmarket.com/img/7ead308998113a46a384918072ac0416/items/1/OS69/21308.jpg"
          alt="Black"
          sx={{ padding: "1em 1em 1em 1em", objectFit: "contain", width: 300 }}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            Cost:$ {result.cost}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Language: {result.language}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Set: {result.set}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Quantity: {result.quantity}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Condition: {result.condition}
          </Typography>
        </CardContent>
      </Card>
    </CollectionCardStyles>
  );
};

export default CollectionCard;

const CollectionCardStyles = styled.div<{ category: CardCategory }>`
  border: 2px solid ${(props) => MAP_COLOR_TO_CATEGORY[props.category]};
  .MuiCard-root {
  }
`;
