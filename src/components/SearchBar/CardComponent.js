// CardComponent.js or CardComponent.jsx
import React from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CreateCollection from "../../pages/create-collection/components/CreateCollection";
import CommentSection from "../CommentSection";
import { Currency, CurrencyTab } from "../Currency";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Button, IconButton, TextField, Modal } from "@mui/material";

const CardComponent = ({
  selectedCard,
  likes,
  dislikes,
  handleLike,
  handleDislike,
  handleModalOpen,
  handleModalClose,
  openModal,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Typography component="div">
          <div>
            <h1 style={{ fontSize: "2rem" }}>{selectedCard.name}</h1>
            <h6>{selectedCard.set_name}</h6>
          </div>
        </Typography>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div style={{ display: "flex", justifyContent: "left" }}>
          <Typography component="div">
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                <button onClick={handleLike}>👍</button>
                <div>{likes}</div>
              </div>
              <div>
                <button onClick={handleDislike}>👎</button>
                <div>{dislikes}</div>
              </div>
            </div>
          </Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                selectedCard.image_uris?.border_crop ||
                selectedCard.image_url ||
                selectedCard.card_images?.[0]?.image_url ||
                selectedCard.imageName ||
                selectedCard.background_image ||
                selectedCard.images.large
              }
              width="200"
            />
          </div>
          <div>
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="https://images.squarespace-cdn.com/content/v1/55b6a6dce4b089e11621d3ed/1585087896250-R3GZ6OFWYQRZUJRCJU3D/produce_monthly.png"
              width="200"
            />
          </div>
        </div>

        <div>
          <div>Total Likes Rank: {likes - dislikes}</div>
        </div>

        {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <Button onClick={handleModalOpen}>
          <AddCircleOutlineRoundedIcon />
          Collection
        </Button>
        {openModal && (
          <Modal open={openModal} onClose={handleModalClose}>
            <CreateCollection selectedCard={selectedCard} />
          </Modal>
        )}
        <Button>
          <AddCircleOutlineRoundedIcon />
          Deck
        </Button>
        {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: 40,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/*eslint-disable-next-line react/no-unescaped-entities*/}
            <h3 style={{ marginRight: "20px" }}>Today's Average</h3>
            <span style={{ background: "orange" }}>10,000</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 style={{ marginRight: "20px" }}>All Time high</h3>
            <span style={{ background: "lightgreen" }}>200,000</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>All Time Low</h3>
            <span style={{ background: "red" }}>3</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <h3 style={{ fontSize: "0.8em" }}>
              <CurrencyTab
                defaultCurrency={Currency.USD}
                onChange={(event) => {
                  console.log("TODO Currency changed", event);
                }}
              />
            </h3>
          </div>
        </div>
        <CommentSection />
      </div>
    </div>
  );
};

export default CardComponent;
