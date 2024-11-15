import { Box } from "@mui/material";
import { motion, useScroll, useSpring } from "framer-motion";

function AnimatedScroll() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Box
      component={motion.div}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        backgroundColor: "#E87B22",
        transformOrigin: "0%",
        zIndex: "9999",
      }}
      style={{ scaleX }}
    ></Box>
  );
}

export default AnimatedScroll;
