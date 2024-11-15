import { Box, Typography } from "@mui/material";

import BoardMemberList from "./BoardMemberList";

export default function Board() {
  return (
    <Box sx={{ width: "85%", mx: "auto", pt: 20, pb: 10 }}>
      <Typography variant="h4" sx={{ pb: 10, textTransform: "uppercase" }}>
        одбор на мачр
      </Typography>

      <BoardMemberList />
    </Box>
  );
}
