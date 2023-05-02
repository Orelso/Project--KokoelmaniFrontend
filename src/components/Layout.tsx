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

  const handleBackgroundColorChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setBackgroundColor(event.target.value as string);
  };

  return (
    <>
      <ResponsiveAppBar />

      <Box sx={{ m: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Select Background Color</InputLabel>
          <Select
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={green[500]}>Green</MenuItem>
            <MenuItem value={red[500]}>Red</MenuItem>
            <MenuItem value="#2196f3">Blue</MenuItem>
            {/* Add more colors as desired */}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ backgroundColor, minHeight: "100vh" }}>{children}</Box>
    </>
  );
}
