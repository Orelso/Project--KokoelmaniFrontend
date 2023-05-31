import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { ResponsiveAppBar } from "./ResponsiveAppBar";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";

type BackgroundImageProps = {
  setBackgroundImage: () => void;
  backgroundImage: string;
};

export default function BackgroundDropdown({
  setBackgroundImage,
  backgroundImage,
}) {
  const handleBackgroundImageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setBackgroundImage(event.target.value as string);
  };

  return (
    <Box sx={{ m: 2 }}>
      <FormControl sx={{ minWidth: 120, fontSize: "1px" }}>
        <InputLabel>Background</InputLabel>
        <Select value={backgroundImage} onChange={handleBackgroundImageChange}>
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
          <MenuItem value="BackgroundImages/Digimon3.jpg">Digimon2</MenuItem>
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
  );
}
