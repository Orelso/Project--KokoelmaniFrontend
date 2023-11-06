import React from "react";
import { styled, Avatar } from "@mui/material";

const CategoryImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  marginRight: theme.spacing(2),
}));

export default CategoryImage;
