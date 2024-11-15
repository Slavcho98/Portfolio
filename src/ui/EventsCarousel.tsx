import { Alert, Box } from "@mui/material";
import { useEffect, memo, useMemo, useCallback } from "react";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

import { useQuery } from "@tanstack/react-query";


import { CarouselItem } from "./CarouselItem";
import Spinner from "./Spinner";
import { getCarousel } from "../services/apiEvents";

const MemoizedCarouselItem = memo(CarouselItem);

const CarouselLoading = () => (
  <Box
    sx={{
      height: "100%",
      pt: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Spinner size={60} />
  </Box>
);

const CarouselError = () => (
  <Box
    sx={{
      pt: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Alert variant="filled" severity="error">
      Грешка при вчитувањето
    </Alert>
  </Box>
);

 function EventsCarousel() {
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  const startAnimation = useCallback(() => {
    if (width > 0) {
      const finalPosition = -width / 2 - 8;

      const controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: 15,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });

      return controls.stop;
    }
  }, [width, xTranslation]);

  useEffect(() => {
    const stopAnimation = startAnimation();
    return () => stopAnimation && stopAnimation();
  }, [startAnimation]);

  const { isLoading, data: carousel, error } = useQuery({
    queryKey: ["carousel"],
    queryFn: getCarousel,
    staleTime: 5 * 60 * 1000, 
  });

  const combinedEventsData = useMemo(() => {
    return carousel ? [...carousel, ...carousel] : [];
  }, [carousel]);

  if (isLoading) return <CarouselLoading />;
  if (error) return <CarouselError />;

  return (
    <Box
      sx={{
        position: "relative",
        overflowX: "hidden",
        display: "flex",
        alignItems: "center",
        mt: 2.5,
        pt: 2,
      }}
    >
      <img
        src="/img/horizontal-dot2.png"
        alt="background decoration"
        style={{
          position: "absolute",
          maxWidth: "100%",
          height: "45vh",
          objectFit: "cover",
          top: 0,
        }}
      />
      <motion.div
        ref={ref}
        style={{
          x: xTranslation,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <MemoizedCarouselItem events={combinedEventsData} />
      </motion.div>
    </Box>
  );
}

export default EventsCarousel;