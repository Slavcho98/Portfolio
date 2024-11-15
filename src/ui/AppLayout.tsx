import { Outlet, useLocation } from "react-router-dom";

import { Box } from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";
import AnimatedScroll from "./AnimatedScroll";
import AlertDialogSlide from "./WindowPopup";

function AppLayout() {
  const location = useLocation();
  const HideFooter = location.pathname === "/user";
  return (
    <Box>
      <AnimatedScroll />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <AlertDialogSlide/>
      {!HideFooter && <Footer />}
    </Box>
  );
}

export default AppLayout;
