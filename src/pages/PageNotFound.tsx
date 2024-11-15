import { Box, IconButton, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { FaTentArrowTurnLeft } from "react-icons/fa6";
function PageNotFound() {
  return (
    <>
      <NavLink to="/">
        <IconButton sx={{ ml: 5, mt: 1 }}>
          <FaTentArrowTurnLeft style={{ fontSize: "1.4em", color: "#E87B22" }} />
        </IconButton>
      </NavLink>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h1">Oops!</Typography>
          <Typography variant="h4">Страницата не е пронајдена.</Typography>
        </Box>
        <Box
          sx={{
            width: "90%",
            height: "60vh",
            mx: "auto",
            backgroundImage: "url('./public/img/error404.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Box>

    </>
  );
}

export default PageNotFound;
