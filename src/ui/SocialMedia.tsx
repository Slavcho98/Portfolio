import { Box, Stack, Typography, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

import SocialMediaIcons from "./SocialMediaIcons";

type Props = {
  sx?: SxProps<Theme>;
  children: ReactNode;
};

export default function SocialMedia({ sx, children }: Props) {
  return (
    <Box
      sx={{
        width: "35%",
        backgroundColor: "#21383E",
        position: "absolute",
        right: 0,
        bottom: "10%",
        zIndex: 1,
        borderRadius: "50vw 0 0 50vw",
        p: "1rem",
        pl: "4rem",
        ...sx,
      }}
    >
      <Typography variant="subtitle2" color="#fff">
        {children}
      </Typography>
      <Stack direction="row" spacing={1}>
        <SocialMediaIcons color="#fff" />
      </Stack>
    </Box>
  );
}
