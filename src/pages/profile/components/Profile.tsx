/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";

import {
  Avatar,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { Box } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import StadiumIcon from "@mui/icons-material/Stadium";
import SendIcon from "@mui/icons-material/Send";
import InstagramIcon from "@mui/icons-material/Instagram";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import CommentSection from "./Interaction";
import { Tab, Tabs, AppBar } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "@mui/material/Button";

type Collection = {
  id: number;
  name: string;
  category: string; // Assuming collections have a category
  image: string;
};

const ProfileImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
}));

const CategoryImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  marginRight: theme.spacing(2),
}));

const SmallImage = styled("img")(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  marginRight: theme.spacing(1),
}));

const CategoryCard = ({
  value,
  titleImage,
  totalValue,
  collections = [],
  category,
}) => {
  const filteredCollections = collections.filter(
    (collection) => collection.category === category
  );

  return (
    <Card
      variant="outlined"
      sx={{ marginBottom: 2, backgroundColor: "rgba(211, 211, 211, 0.5)" }}
    >
      <CardContent
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <div>
          {/* Display the category title image */}
          <img
            src={titleImage}
            alt="category"
            style={{ width: "150px", height: "75px" }}
          />
        </div>
        {/* Create a horizontal flex container for the images */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* Display the images from the collection */}
          {collections.map((collection, index) => (
            <img
              key={index}
              src={collection.image} // replace 'image' with correct property from your collection object
              alt="collection"
              style={{ width: "150px", height: "75px", margin: "0 5px" }} // added margin for spacing between images
            />
          ))}
          <Typography variant="body1">{value}</Typography>
          <Typography variant="body2">Total Value: {totalValue}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

const KeyValueRow = ({ label, value, icon }) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {label}:
      </Typography>
      <Typography variant="subtitle1">
        {icon && icon}
        {value}
      </Typography>
    </Box>
  );
};

const ProfilePage = ({ name }) => {
  const [collections, setCollections] = useState([]); // new state for collections

  useEffect(() => {
    const username = "orelso"; // The specified user

    axios
      .get(`${BACKEND_URL}/collections?username=${username}`)
      .then((res) => {
        setCollections(res.data.collections);
      })
      .catch(console.error);
  }, []);

  // New effect for fetching collections data
  useEffect(() => {
    const username = "orelso"; // The specified user

    axios
      .get(`${BACKEND_URL}/collections?username=${username}`)
      .then((res) => {
        setCollections(res.data);
      })
      .catch(console.error);
  }, []);

  const profile = {
    image: "/DB.jpg",
    name: "Orelso",
    collectibles: 50,
    totalValue: "$500480",
    pokemonGoTrainerCode: "706716799219",
    mtgArenaName: "Orelso#99778",
    itemsSold: 100,
    itemsBought: 150,
    itemsTraded: 50,
    categories: {
      pokemon: {
        count: 15,
        image: "url-to-pokemon-image",
        titleImage: "/CategoryLogos/pokemon.png",
      },
      magicTheGathering: {
        count: 10,
        image: "url-to-magic-image",
        titleImage: "/CategoryLogos/magicTheGathering.png",
      },
      funkoPop: {
        count: 15,
        image: "url-to-funkoPop-image",
        titleImage: "/CategoryLogos/funkoPop.png",
      },
      fleshAndBlood: {
        count: 20,
        image: "url-to-fleshAndBlood-image",
        titleImage: "/CategoryLogos/fleshAndBlood.png",
      },
      marvelComics: {
        count: 15,
        image: "url-to-marvelComics-image",
        titleImage: "/CategoryLogos/marvelComics.png",
      },
      yugioh: {
        count: 25,
        image: "url-to-yugioh-image",
        titleImage: "/CategoryLogos/yugioh.png",
      },
      digimon: {
        count: 10,
        image: "url-to-digimon-image",
        titleImage: "/CategoryLogos/digimon.png",
      },
      nft: {
        count: 5,
        image: "url-to-nft-image",
        titleImage: "/CategoryLogos/nft.png",
      },
      videogames: {
        count: 30,
        image: "url-to-videogames-image",
        titleImage: "/CategoryLogos/videogames.png",
      },
    },
  };
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const getTotalCategoryValue = () => {
    return Object.values(profile.categories).reduce(
      (total, { count }) => total + count * 10000,
      0
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card
          variant="outlined"
          sx={{ backgroundColor: "rgba(211, 211, 211, 0.5)" }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ProfileImage alt={profile.name} src={profile.image} />
            <Typography variant="h4">{profile.name}</Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                startIcon={<PersonAddIcon />}
                color="primary"
                style={{
                  backgroundColor: "#56adfa",
                  fontSize: "10px",
                  margin: "10px",
                }}
              >
                Add Friend
              </Button>
              <Button
                startIcon={<AddCircleIcon />}
                color="primary"
                style={{
                  backgroundColor: "#90EE90",
                  fontSize: "10px",
                  margin: "10px",
                }}
              >
                Follow
              </Button>
              <Button
                startIcon={<AddCircleIcon />}
                color="primary"
                style={{
                  backgroundColor: "#d4e79f",
                  fontSize: "10px",
                  margin: "10px",
                }}
              >
                Message
              </Button>
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                width: "100%",
                mt: 2,
              }}
            >
              <KeyValueRow
                label="PokemonGo Trainer Code"
                value={profile.pokemonGoTrainerCode}
                icon={<CatchingPokemonIcon />}
              />
              <KeyValueRow
                label="MTGArena Name"
                value={profile.mtgArenaName}
                icon={<StadiumIcon />}
              />
              <KeyValueRow
                label="Items Sold"
                value={`🏦${profile.itemsSold}`}
                icon={undefined}
              />
              <KeyValueRow
                label="Items Bought"
                value={`💸${profile.itemsBought}`}
                icon={undefined}
              />
              <KeyValueRow
                label="Items Traded"
                value={`🫱🏻‍🫲🏾${profile.itemsTraded}`}
                icon={undefined}
              />
              <KeyValueRow
                label="Total Collectibles"
                value={`🏆${profile.collectibles}`}
                icon={undefined}
              />
              <KeyValueRow
                label="Total Value"
                value={`$${getTotalCategoryValue().toLocaleString()}`}
                icon={undefined}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="Send Message"
                  component="a"
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SendIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="Instagram"
                  component="a"
                  href="https://instagram.com/thekokoelmani"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="TikTok"
                  component="a"
                  href="https://www.tiktok.com/@orelsovitam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MusicNoteIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="Twitter"
                  component="a"
                  href="https://twitter.com/orelsovitam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="Facebook"
                  component="a"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <AppBar
          position="static"
          sx={{ color: "black", backgroundColor: "rgba(211, 211, 211, 0.5)" }}
        >
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Comments" />
            <Tab label="Collectible" />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && <CommentSection />}
        {tabIndex === 1 &&
          Object.entries(profile.categories).map(
            ([category, { count, titleImage }]) => (
              <CategoryCard
                key={category}
                titleImage={titleImage}
                value={count}
                totalValue={`$${(count * 10000).toLocaleString()}`}
                category={category} // Pass the category to filter collections by category
                collections={collections} // Pass collections prop to CategoryCard
              />
            )
          )}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
