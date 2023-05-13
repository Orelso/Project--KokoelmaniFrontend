/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Container } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Grid } from "@mui/material";
// import {AnyCardCollection} from 'kokoelmani-shared/dist';
import CollectionCard from "../../../components/CollectionCard";
import type { Collection } from "../../../types";
import { BACKEND_URL } from "../../../constants";

export default function Collections() {
  // const [collections, setCollections] = useState<AnyCardCollection[]>([])
  const [collections, setCollections] = useState<Collection[]>([]);

  // pull all data and store in collections state
  useEffect(() => {
    fetch(`${BACKEND_URL}/item/`)
      .then((res) => res.json())
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .then((data) => setCollections(data))
      .catch(console.error);
  }, []); // [] tells the serever to run it once

  const handleDelete = async (id: number) => {
    console.log("tete", collections);
    await fetch(`${BACKEND_URL}/item/${id}`, {
      method: "DELETE",
    });
    const newCollections = collections.filter(
      (collection) => collection !== id
    ); //TODO add .id to (collection)
    setCollections(newCollections);
  };

  return (
    <Container sx={{ mt: 12 }}>
      <h1>Your Collection</h1>
      <Grid container spacing={10}>
        {collections.map((collection) => (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          <Grid item key={collection} xs={12} sm={8} md={6} lg={4}>
            {" "}
            {/*//TODO add .id to key{collection} */}
            <CollectionCard
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              collection={collection}
              onDelete={() => handleDelete(collection)}
            />{" "}
            {/*//TODO add .id to (collection) */}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
