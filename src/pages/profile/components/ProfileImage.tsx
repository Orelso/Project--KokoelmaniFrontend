import React from "react";
import { styled, Avatar } from "@mui/material";

const ProfileImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
}));

export default ProfileImage;
