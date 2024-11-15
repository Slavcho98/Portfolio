import { Box, Typography } from "@mui/material";

function PrimaryAboutContent() {
  return (
    <Box
      sx={{
        backgroundColor: "#E87B22",
        width: 250,
        p: 1.5,
        position: "absolute",
        borderRadius: "20px",
        lineHeight: 0,
        zIndex: "999",
        right: 70,
        top: "10%",
        transform: "translate(-50%, 0)",
      }}
    >
      <Typography variant="caption" sx={{ fontSize: ".6em", color: "#fff" }}>
        Претплати се на нашиот информативен <br /> билтен и никогаш повеќе не
        пропуштај <br /> важни настани и известувања
      </Typography>
    </Box>
  );
}

export default PrimaryAboutContent;
