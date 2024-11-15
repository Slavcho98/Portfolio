import { ReactNode } from "react";
import { Box } from "@mui/material";
import SocialMedia from "./SocialMedia";

type Props = {
  children: ReactNode;
};

function HeroSection({ children }: Props) {
  return (
    <Box
      sx={{
        pt: { xs: 7, sm: 8 },
        position: "relative",
      }}
    >
      <Box
        component="img"
        src="/img/bg-banner.png"
        sx={{
          position: "absolute",
          bottom: 0,
          zIndex: -1,
          width: "100%",

          objectFit: "contain",
        }}
      />

      <Box
        sx={{
          pt: "1rem",
          width: { xs: "100%", sm: "85%" },
          m: "0 auto",
        }}
      >
        {children}

        <SocialMedia sx={{width: {xs:"80%", md: "35%"},  bottom: 0 }}>
          Заследи не на социјалните медиуми
        </SocialMedia>
      </Box>
    </Box>
  );
}

export default HeroSection;
