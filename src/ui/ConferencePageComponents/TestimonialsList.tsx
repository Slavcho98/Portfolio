import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import TestimonialItem from "./TestimonialItem";
import { useTestimonials } from "../../hooks/useTestimonials";
import React, { useCallback, useEffect, useState } from "react";

const TestimonialsList: React.FC = () => {
  const { testimonialsList } = useTestimonials();
  const [index, setIndex] = useState(0);

  const handleNext = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % (testimonialsList?.length || 1));
  }, [testimonialsList]);

  const handlePrev = useCallback(() => {
    setIndex(
      (prevIndex) =>
        (prevIndex - 1 + (testimonialsList?.length || 1)) %
        (testimonialsList?.length || 1)
    );
  }, [testimonialsList]);

  useEffect(() => {
    const interval = setInterval(handleNext, 2000);
    return () => clearInterval(interval);
  }, [handleNext]);

  if (!testimonialsList || testimonialsList.length === 0) {
    return <Typography variant="body1">No testimonials available.</Typography>;
  }

  return (
    <Box sx={{ py: 15, mb: 20, position: "relative" }}>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <motion.div
          style={{ display: "flex", alignItems: "center" }}
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: 0.7 }}
        >
          {testimonialsList.map((testimonial, i) => (
            <Box key={i} sx={{ flex: "0 0 100%" }}>
              <TestimonialItem
                testimonial={testimonial}
                index={i}
                currentIndex={index}
                totalCount={testimonialsList.length} 
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            </Box>
          ))}
        </motion.div>
      </Box>
      <Box
            component="img"
            src="/img/vertical_bg2.png"
            alt="Commas Image"
            sx={{
              position: "absolute",
              bottom: 0,
              width: "80%",
              right: 0,
              height: "25vh",
              objectFit: "cover",
              zIndex: -1
              
     
            }}
          />
    </Box>
  );
};

export default TestimonialsList;
