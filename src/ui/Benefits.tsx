import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import BenefitsItem from "./BenefitsItem";
import { useSlideAnimation } from "../hooks/useSlideAnimation";

const MotionGridItem = motion.div;

export default function Benefits() {
  const {
    isVisible,
    sectionRef,
    animationVariantsLeft,
    animationVariantsRight,
  } = useSlideAnimation();

  return (
    <Box sx={{ overflow: "hidden", mx: "auto", my: "4rem" }}>
      <Box sx={{ width: "85%", mx: "auto" }} ref={sectionRef}>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
  
        >
          <MotionGridItem
            style={{ flex: "0 0 48%" }} 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={animationVariantsLeft}
          >
            <BenefitsItem />
          </MotionGridItem>

          <MotionGridItem
            style={{ flex: "0 0 48%" }} 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={animationVariantsRight}
          >
            <Box sx={{ pt: "4rem" }}>
              <Typography variant="h4">
                Бенефити од <br /> зачленување во <br />
                МАЧР
              </Typography>
              <Typography variant="body1" sx={{ pt: 5 }}>
                Македонската асоцијација за човечки ресурси - МАЧР како
                невладино, непрофитно и непартиско здружение на граѓани,
                продолжува со остварување на својата мисија за промоција и
                унапредување на професијата управување со човечките ресурси,
                како и создавање и имплементирање на највисоките професионални
                стандарди и развој на човечкиот капитал во Република Македонија
                како единствен ентитет од овој вид во земјава.
              </Typography>
            </Box>
          </MotionGridItem>
        </Box>
      </Box>
    </Box>
  );
}
