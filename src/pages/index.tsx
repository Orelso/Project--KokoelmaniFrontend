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
console.log("🚀 ~ file: index.tsx:26 ~ backendUrl", BACKEND_URL);

function HomeView() {
  return (
    <div>
      <Typography sx={{ mt: 1 }} variant="h1" color="#ff7961" align="center">
        Kokoelmani
      </Typography>
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
