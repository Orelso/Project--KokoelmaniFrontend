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
  const [selectedBackground, setSelectedBackground] = React.useState(
    "default-background.jpg"
  );

  const handleBackgroundChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedBackground(event.target.value as string);
    document.body.style.backgroundImage = `url(${event.target.value})`;
  };

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="background-select-label">Background</InputLabel>
          <Select
            labelId="background-select-label"
            id="background-select"
            value={selectedBackground}
            onChange={handleBackgroundChange}
          >
            <MenuItem value="MarvelDC1.jpg">Default Background</MenuItem>
            <MenuItem value="red-background.jpg">Red Background</MenuItem>
            <MenuItem value="blue-background.jpg">Blue Background</MenuItem>
            <MenuItem value="green-background.jpg">Green Background</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {children}
    </>
  );
}
