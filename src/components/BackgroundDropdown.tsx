import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import Select, { SelectChangeEvent } from "@mui/material/Select";

type BackgroundImageProps = {
  setBackgroundImage: (bgImage: string) => void;
  backgroundImage: string;
};

export default function BackgroundDropdown({
  setBackgroundImage,
  backgroundImage,
}: BackgroundImageProps) {
  const handleBackgroundImageChange = (event: SelectChangeEvent<string>) => {
    setBackgroundImage(event.target.value);
  };

  return (
    <Box sx={{ m: 2 }}>
      <FormControl sx={{ minWidth: 120, fontSize: "1px" }}>
        q<InputLabel>Background</InputLabel>
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
