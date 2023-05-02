import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchBar from "./SearchBar";
import StorageIcon from "@mui/icons-material/Storage";
import { green, red } from "@mui/material/colors";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { ResponsiveAppBar } from "./ResponsiveAppBar";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import marvelDCImage from "/MarvelDC1.jpg";

export default function Layout({ children }: { children: JSX.Element }) {
  const [backgroundColor, setBackgroundColor] = React.useState("");
  const [backgroundImage, setBackgroundImage] = React.useState("");

  const handleBackgroundColorChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setBackgroundColor(event.target.value as string);
    setBackgroundImage("");
  };

  const handleBackgroundImageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setBackgroundImage(event.target.value as string);
    setBackgroundColor("");
  };

  const getBackgroundStyle = () => {
    if (backgroundColor) {
      return { backgroundColor };
    } else if (backgroundImage) {
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    } else {
      return {};
    }
  };

  return (
    <>
      <ResponsiveAppBar />

      <Box sx={{ m: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Select Background</InputLabel>
          <Select
            value={backgroundColor || backgroundImage}
            onChange={
              backgroundColor
                ? handleBackgroundColorChange
                : handleBackgroundImageChange
            }
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={green[500]}>Green</MenuItem>
            <MenuItem value={red[500]}>Red</MenuItem>
            <MenuItem value="#2196f3">Blue</MenuItem>
            <MenuItem value="/MarvelDC1.jpg">Marvel DC</MenuItem>
            {/* Add more colors and images as desired */}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ ...getBackgroundStyle(), minHeight: "100vh" }}>{children}</Box>
    </>
  );
}
