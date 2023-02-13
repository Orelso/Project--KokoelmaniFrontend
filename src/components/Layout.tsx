import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchBar from "./SearchBar";
import StorageIcon from "@mui/icons-material/Storage";
import { green, red } from "@mui/material/colors";
// import {useNavigate} from "react-router-dom";
// import { makeStyles } from "@mui/styles";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { ResponsiveAppBar } from "./ResponsiveAppBar";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <ResponsiveAppBar />
      {children}
    </>
  );
}
