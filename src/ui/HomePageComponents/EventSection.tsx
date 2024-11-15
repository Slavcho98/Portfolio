import { Box } from "@mui/material";

import EventCard from "../EventCard";

import { useMemo } from "react";
import TextContent from "./TextContent";
import HeroSection from "./HeroSection2";

interface EventSectionProps {
  side: "left" | "right";
}

const EventSection = ({ side }: EventSectionProps) => {
  const firstEventStyles = useMemo(
    () => ({
      borderRadius: "50vw 50vw 0 0",
      width: { xs: 1, md: "260px" },
      mb: "0",
      height: { xs: "60dvh", md: "50dvh" },
      backgroundImage: "url('./public/img/HomePageImg3.jpg')",
      backgroundPosition: "top",
      backgroundSize: "cover",
    }),
    []
  );

  const secondEventStyles = useMemo(
    () => ({
      backgroundImage: "url('./public/img/manPhone.jpg')",
      width: "320px",
      borderRadius: "0 0 50vw 50vw",
      height: "55dvh",
      ml: "auto",
      mb: 0,
    }),
    []
  );

  const rightEventStyles = useMemo(
    () => ({
      width: "250px",
      alignSelf: "center",
      borderRadius: "10vw 10vw 0 0",
      mt: "2rem",
      ml: "auto",
      height: "40dvh",
      backgroundImage: "url('./public/img/manLaptop.jpg')",
    }),
    []
  );

  const leftEventStyles = useMemo(
    () => ({
      width: "110%",
      position: "relative",
    }),
    []
  );

  return (
    <Box sx={side === "left" ? leftEventStyles : {}}>
      {side === "left" && (
        <>
          <EventCard sx={firstEventStyles} />
          <HeroSection />
          <EventCard sx={secondEventStyles} />
        </>
      )}
      {side === "right" && (
        <Box
          sx={{
            width: 1,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <TextContent />
          <EventCard sx={rightEventStyles} />
        </Box>
      )}
    </Box>
  );
};

export default EventSection;
