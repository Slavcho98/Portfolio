import { Box, Typography } from "@mui/material";
import UserBadge from "./UserBadge";

export default function ConferenceItem2() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        height: "100%",
        p: 2,
        border: 1
      }}
    >
      <Typography variant="h3" sx={{ fontSize: "2.5em" }}>
        Најголемиот HR настан на нашите простори - Годишната HR конференција на
        МАЧР
      </Typography>
      <Typography variant="caption" sx={{ mb: 2 }}>
        Меѓународна размена на искуства во полето на човечки ресурси и
        константно движење во чекор со светските трендови.
      </Typography>
      <UserBadge />
    </Box>
  );
}
