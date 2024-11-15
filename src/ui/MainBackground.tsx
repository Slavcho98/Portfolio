import { Box } from "@mui/material";

export default function MainBackground() {
  return (
    <Box
      sx={{
        minHeight: "25vh",
        backgroundImage: "url('./public/img/horizontal-dot2.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    ></Box>
  );
}
