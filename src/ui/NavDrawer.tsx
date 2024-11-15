import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import MenuLinks from "./MenuLinks";
import { NavDrawerProps } from "../types/type";

const drawerWidth = 300;

const NavDrawer: React.FC<NavDrawerProps> = ({
  mobileOpen,
  handleDrawerToggle,
  container,
}) => {
  const drawerContent = (
    <Box>
      <NavLink to="/">
        <Logo sx={{ width: 40, py: 1, mx: "auto" }} />
      </NavLink>
      <MenuLinks onLinkClick={handleDrawerToggle} />{" "}
    </Box>
  );

  return (
    <nav>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </nav>
  );
};

export default NavDrawer;
