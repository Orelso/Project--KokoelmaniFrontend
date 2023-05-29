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
  collection: any; // Updated prop name
  onDelete?: (id: number) => void;
}

const CollectionCard = ({ collection, onDelete }: Props) => {
  return (
    <CollectionCardStyles {...{ category: collection.category }}>
      <Card elevation={8}>
        <CardHeader
          action={
            <IconButton onClick={() => onDelete?.(collection.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={collection.name}
          sx={{ color: "black", textAlign: "center" }}
          subheader={collection.category}
        />
        <CardMedia
          component="img"
          image="https://static.cardmarket.com/img/7ead308998113a46a384918072ac0416/items/1/OS69/21308.jpg"
          alt="Black"
          sx={{ objectFit: "contain", height: 200, maxWidth: 0 }}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary">
            Cost:$ {collection.cost}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Language: {collection.language}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Set: {collection.set}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Quantity: {collection.quantity}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Condition: {collection.condition}
          </Typography>
        </CardContent>
      </Card>
    </CollectionCardStyles>
  );
};

export default CollectionCard;

const CollectionCardStyles = styled.div<{ category: CardCategory }>`
  border: 2px solid ${(props) => String(MAP_COLOR_TO_CATEGORY[props.category])};
  .MuiCard-root {
  }
`;
