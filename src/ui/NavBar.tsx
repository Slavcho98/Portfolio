import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import NavItems from "./NavItemList";
import NavDrawer from "./NavDrawer";
import NavMenuButton from "./NavMenuButton";
import UserActions from "./UserActions";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function NavBar({ window }: { window?: () => Window }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ p: 0 }} id="back-to-top-anchor">
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          position: "fixed",
          bgcolor: "rgba(255, 255, 255, 0.93)",
          color: "#0F294A",
          boxShadow: "0px 30px 80px 0px #2F415833",
          p: ".5rem",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", md: "space-around" },
            py: 0,
            px: { xs: 1, md: 0 },
          }}
        >
          <NavMenuButton onClick={handleDrawerToggle} />
          <NavLink to="/">
            <Logo sx={{ width: 35 }} />
          </NavLink>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <NavItems />
          </Box>

          <UserActions />
        </Toolbar>
      </AppBar>
      <NavDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        container={container}
      />
    </Box>
  );
}
