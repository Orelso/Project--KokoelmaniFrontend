import { Typography, Box } from "@mui/material";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import DailyCardTable from "../components/DailyCardTable";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar/SearchBar";
import type { MTGCard } from "../types";
// import type { YuGiOhCard } from "../types";
import { BACKEND_URL } from "../constants";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Collection</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeView />
    </>
  );
};

export default Home;

function HomeView() {
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
        <img
          src="./CategoryLogos/marvelcomics.png"
          alt="Marvel Comics"
          style={{
            flexShrink: 0,
            width: "auto",
            height: "100px",
            marginRight: "10px",
          }}
        />
        <img
          src="./CategoryLogos/magicthegathering.png"
          alt="Magic: The Gathering"
          style={{
            flexShrink: 0,
            width: "auto",
            height: "100px",
            marginRight: "10px",
          }}
        />
        <img
          src="./CategoryLogos/pokemon.png"
          alt="Pokemon"
          style={{
            flexShrink: 0,
            width: "auto",
            height: "100px",
            marginRight: "10px",
          }}
        />
        <img
          src="./CategoryLogos/digimon.png"
          alt="Digimon"
          style={{
            flexShrink: 0,
            width: "auto",
            height: "100px",
            marginRight: "10px",
          }}
        />
        <img
          src="./CategoryLogos/yugioh.png"
          alt="Yu-Gi-Oh"
          style={{
            flexShrink: 0,
            width: "auto",
            height: "100px",
            marginRight: "10px",
          }}
        />
        <img
          src="./CategoryLogos/fleshandblood.png"
          alt="Flesh and Blood"
          style={{
            flexShrink: 0,
            width: "auto",
            height: "100px",
            marginRight: "10px",
          }}
        />
        <img
          src="./CategoryLogos/funkopop.png"
          alt="Funko Pop"
          style={{
            flexShrink: 0,
            width: "auto",
            height: "100px",
            marginRight: "10px",
          }}
        />
        <img
          src="./CategoryLogos/nft.png"
          alt="NFT"
          style={{
            flexShrink: 0,
            width: "auto",
            height: "100px",
            marginRight: "10px",
          }}
        />
        <img
          src="./CategoryLogos/videogames.png"
          alt="Video Games"
          style={{
            flexShrink: 0,
            width: "auto",
            height: "100px",
            marginRight: "10px",
          }}
        />
      </div>
      <Box
        sx={{
          textAlign: "center",
          color: "black",
          backgroundColor: "rgba(211, 211, 211, 0.5)",
          padding: "20px",
          backdropFilter: "blur(5px)",
        }}
      >
        <h1>
          Kokoelmani: Where Your Collections Come Alive: Store, Analyze, and
          Delight! All in one place
        </h1>
      </Box>
      <SearchBar />

      {/* <Banner /> */}

      <Typography sx={{ color: "green", mt: 6 }} variant="h4" align="center">
        Featured Highs of the Day
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%", // Set initial width to 100%
            maxWidth: "340px", // Set maximum width
            height: "410px",
            backgroundColor: "#efe4e2",
          },
        }}
      >
        <DailyCardTable />
        <DailyCardTable />
        <DailyCardTable />
        <DailyCardTable />
      </Box>
      <Typography variant="h4" sx={{ color: "red", mt: 6 }} align="center">
        Featured Lows of the Day
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%", // Set initial width to 100%
            maxWidth: "340px", // Set maximum width
            height: "410px",
            backgroundColor: "#efe4e2",
          },
        }}
      >
        <DailyCardTable />
        <DailyCardTable />
        <DailyCardTable />
        <DailyCardTable />
      </Box>

      <div>
        <Footer />
      </div>
    </div>
  );
}
function isObject(response: any) {
  return typeof response === "object" && !Array.isArray(response);
}
