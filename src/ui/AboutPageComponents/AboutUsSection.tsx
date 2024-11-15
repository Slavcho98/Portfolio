import { Box } from "@mui/material";
import EventCard from "../EventCard";
import { ReactNode } from "react";
interface AboutUsSectionProps {
  primaryContent?: ReactNode;
  secondaryContent?: ReactNode;
  badge?: ReactNode;
  button?: ReactNode;
  children?: ReactNode;
}

export default function AboutUsSection({
  primaryContent,
  secondaryContent,
  badge,
  button,
  children,
}: AboutUsSectionProps) {
  return (
    <Box sx={{ position: "relative", pb: 10 }}>
      <img
        src="/img/whiteElement2.png"
        style={{
          position: "absolute",
          zIndex: "-1",
          right: 0,
          maxWidth: "100%",
          height: "55dvh",
          objectFit: "cover",
        }}
      />
      <img
        src="/img/whiteElement3.png"
        style={{
          position: "absolute",
          zIndex: "-1",
          left: "0",
          bottom: 0,
          maxWidth: "100%",
          height: "55dvh",
          objectFit: "cover",
        }}
      />
      <Box sx={{ width: "85%", mx: "auto", py: 10, position: "relative" }}>
        <Box sx={{ minHeight: "80dvh" }}>
          <Box
            sx={{
              width: 1,
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <EventCard
              sx={{
                borderRadius: "10vw 10vw 0 0",
                width: 260,
                height: "50dvh",
                pb: "1rem",
                backgroundImage: "url('/img/girl1.png')",
              }}
            />
            {secondaryContent}
          </Box>
          <Box
            sx={{
              width: 1,
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "70%" }}>
              {children}
              {button}
            {primaryContent}
            </Box>
            <EventCard
              borderRadius="0 0 50vw 50vw"
              sx={{
                mb: 0,
                width: "230px",
                height: "40dvh",
                backgroundImage: "url('/img/girl2.png')",
              }}
            />
            {badge}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
