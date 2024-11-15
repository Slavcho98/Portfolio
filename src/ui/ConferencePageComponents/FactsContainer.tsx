import { Box } from "@mui/material";
import Facts from "./Facts";

function FactsContainer() {
  return (
    <Box sx={{ position: "relative", minHeight: "30vh", py: 10 }}>
      <Box
        sx={{
          minHeight: "25vh",
          backgroundImage: 'url("/img/horizontal-dot2.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",

          position: "absolute",
          width: 1,
          bottom: 0,
          zIndex: "-1",
        }}
      />
      <Box
        sx={{
          width: "85%",
          mx: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Facts />
      </Box>
    </Box>
  );
}

export default FactsContainer;
