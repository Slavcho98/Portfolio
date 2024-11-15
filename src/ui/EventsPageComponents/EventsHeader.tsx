import { Box, Typography } from "@mui/material";

import SearchBar from "../SearchBar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function EventsHeader({ children }: Props) {
  return (
    <Box
      sx={{
        width: "85%",
        mx: "auto",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", py: 5 }}>
        <Typography variant="h4" fontWeight={700}>
          {children}
        </Typography>
        <SearchBar />
      </Box>

    </Box>
  );
}
