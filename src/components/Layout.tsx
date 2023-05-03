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
        backgroundSize: "100%",
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
            <MenuItem value="">Basic Bitch</MenuItem>
            <MenuItem value="BackgroundImages/AttackOnTitan.jpg">
              Attack On Titan
            </MenuItem>
            <MenuItem value="BackgroundImages/AttackOnTitan2.jpg">
              Attack On Titan 2
            </MenuItem>
            <MenuItem value="BackgroundImages/dbz1.jpg">Dragon Ball</MenuItem>
            <MenuItem value="BackgroundImages/Digimon-Angemon.jpg">
              Digimon-Angemon
            </MenuItem>
            <MenuItem value="BackgroundImages/Digimon-Characters.jpg">
              Digimon-Characters
            </MenuItem>
            <MenuItem value="BackgroundImages/Digimon.jpg">Digimon</MenuItem>
            <MenuItem value="BackgroundImages/Digimon2.jpg">Digimon2</MenuItem>
            <MenuItem value="BackgroundImages/Dragonball-Goku.jpg">
              Dragon Ball-Goku
            </MenuItem>
            <MenuItem value="BackgroundImages/Dragonball-JoyRide.jpg">
              Dragon Ball-Joy ride
            </MenuItem>
            <MenuItem value="BackgroundImages/DragonBall-Kamehouse.jpg">
              Dragon Ball-Kame house
            </MenuItem>
            <MenuItem value="BackgroundImages/Funko-BatgirlHarley.jpg">
              Funko
            </MenuItem>
            <MenuItem value="BackgroundImages/Funko-Robin.jpg">Funko2</MenuItem>
            <MenuItem value="BackgroundImages/MTG-AllWillBeOne.jpg">
              MTG All Will Be One
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ ...getBackgroundStyle(), minHeight: "100vh" }}>{children}</Box>
    </>
  );
}
