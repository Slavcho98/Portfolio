import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export default function ConferenceText({ children, sx }: Props) {
  return (
    <Box
      sx={{
        width: {xs: "85%"},
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        height: "100%",

        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
