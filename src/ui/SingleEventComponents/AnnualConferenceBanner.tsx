import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  sx?: SxProps<Theme>;
  children?: ReactNode;
};
export default function ConferenceBanner({ sx, children }: Props) {
  return (
    <Box sx={{ position: "relative", height: { xs: "50vh", md: "90vh" } }}>
      <Box
        sx={{
          width: { xs: 1, md: "60%" },
          height: "100%",
          ml: "auto",
          borderRadius: { xs: "50vw 50vw 0 0", md: "50vw" },
          overflow: "hidden",
          backgroundImage: 'url("/img/conference.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
          position: "relative",
          ...sx,
        }}
      />
      {children}
    </Box>
  );
}
