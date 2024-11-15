import React from "react";
import IconButton from "@mui/material/IconButton";
import { IoMdMenu } from "react-icons/io";

interface NavMenuButtonProps {
  onClick: () => void;
}

const NavMenuButton: React.FC<NavMenuButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={onClick}
      sx={{ mr: 2, display: { sm: "none" } }}
    >
      <IoMdMenu />
    </IconButton>
  );
};

export default NavMenuButton;
