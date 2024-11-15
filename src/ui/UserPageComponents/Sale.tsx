import { Box, Stack, Typography } from "@mui/material";

export default function Sale() {
  return (
    <Stack direction="row" spacing={4} sx={{ py: 3 }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: " 0px 9px 80px 0px #2F41581F",
          width: "25%",
          height: "25vh",
          p: 2,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="caption">
          Освоено <br />{" "}
          <span style={{ fontSize: "5em", fontWeight: "700" }}>20%</span> <br />{" "}
          попуст за следна карта
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: " 0px 9px 80px 0px #2F41581F",
          width: "25%",
          height: "25vh",
          p: 2,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="caption">
          Препорачано на <br />
          <span style={{ fontSize: "5em", fontWeight: "700" }}>20</span> <br />{" "}
          пријатели
        </Typography>
      </Box>
    </Stack>
  );
}
