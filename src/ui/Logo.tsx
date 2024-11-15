import { Box, SxProps, Theme } from "@mui/material";

interface LogoProps {
  sx?: SxProps<Theme>;
}

function Logo({ sx }: LogoProps) {
  return (
    <Box sx={{ display: "flex", ...sx }}>
      <img
        src="/img/logo.png"
        alt="Logo image"
        style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
      />
    </Box>
  );
}

export default Logo;
