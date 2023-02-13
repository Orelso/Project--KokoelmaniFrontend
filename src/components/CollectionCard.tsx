/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { CardMedia, IconButton, Typography } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
// import { AnyCardCollection } from 'kokoelmani-shared/dist';
// import { DataGrid } from '@mui/x-data-grid';
import styled from "styled-components";
import type { CardCategory } from "../types";

const MAP_COLOR_TO_CATEGORY = {
  // 'comic-book':"linear-gradient(90deg, rgba(255,203,5,1) 0%, rgba(42,117,187,1) 25%, rgba(199,160,8,1) 50%, rgba(60,90,166,1) 75%);",
  Pokemon: "blue",
  MTG: "brown",
  Digimon: "yellow",
  "Yu-Gi-Oh": "purple",
  "other tcg": "orange",
};

// const useStyles = makeStyles({
//     color: {
//         border: (collection: any) => {
//  return `2px solid ${MAP_COLOR_TO_CATEGORY[collection.category]};`
//             if (collection.category === 'comic-book') {
//                 return '2px solid linear-gradient(90deg, rgba(255,203,5,1) 0%, rgba(42,117,187,1) 25%, rgba(199,160,8,1) 50%, rgba(60,90,166,1) 75%);'
//             } else if (collection.category === 'Pokemon') {
//                 return '2px solid blue'
//             } else if (collection.category === "MTG") {
//                 return '2px solid brown'
//             } else if (collection.category === 'Digimon') {
//                 return "2px solid yellow"
//             } else if (collection.category === 'Yu-Gi-Oh') {
//                 return "2px solid purple"
//             } else if (collection.category === 'other tcg') {
//                 return '2px solid orange'
//             }
//         }
//     },
// })

// interface Props {
//     handleDelete: () => void;
//     collection: any
// }
interface Props {
  collection: any; // TODO add Collection type
  onDelete?: (id: number) => void;
}

const CollectionCard = ({ collection, onDelete }: Props) => {
  // const classes = useStyles(collection)

  return (
    <CollectionCardStyles {...{ category: collection.category }}>
      <Card elevation={8}>
        <CardHeader
          action={
            <IconButton onClick={() => onDelete?.(collection.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          title={collection.name}
          sx={{ color: "black", textAlign: "center" }}
          subheader={collection.category}
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
  border: 2px solid ${(props) => MAP_COLOR_TO_CATEGORY[props.category]};
  .MuiCard-root {
  }
`;
