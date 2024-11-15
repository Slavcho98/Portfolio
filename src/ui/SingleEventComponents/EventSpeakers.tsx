import { Box, Typography } from "@mui/material";
import EventSpeakersItem from "./EventSpeakersItem";

export default function EventSpeakers() {
  return (
    <Box sx={{ position: "relative", my: 20 }}>
      <Box sx={{ width: "85%", mx: "auto", position: "relative" }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mr: "-1rem" }}
        >
          <Box sx={{ width: 1 / 2 }}>
            <Typography variant="h4">Говорници на настанот</Typography>
          </Box>
          <Box
            sx={{
              width: 1 / 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <EventSpeakersItem />
          
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "65%",
          height: "45vh",
          position: "absolute",
          zIndex: "-1",
          bottom: 0,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: "url('./public/img/whiteElement1.png')",
        }}
      />
    </Box>
  );
}
