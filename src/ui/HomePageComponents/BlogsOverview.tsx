import { Box, SxProps, Theme, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CustomButton from "../../ui/CustomButton";
import { useMemo } from "react";
import { useSlideAnimation } from "../../hooks/useSlideAnimation";
import HeroBlog from "../HeroBlog";
import EventCard from "../EventCard";
import Background2 from "../Background2";
import { HomePageImages } from "../../types/imagesTypes";
import { images } from "../../types/imagesTypes";
const defaultStyles: SxProps<Theme> = {
  position: "absolute",
  left: "10%",
  top: "40%",
  zIndex: "999",
  backgroundColor: "#fff",
  p: "2rem",
  width: "80%",
  borderRadius: "10px",
  boxShadow: "0px 30px 80px 0px #2F415833",
};

const BlogsOverview = () => {
  const {
    isVisible,
    sectionRef,
    animationVariantsLeft,
    animationVariantsRight,
  } = useSlideAnimation();

  const leftEventStyles = useMemo(
    () => ({
      width: "110%",
      position: "relative",
    }),
    []
  );

  const firstEventStyles = useMemo(
    () => ({
      borderRadius: "50vw 50vw 0 0",
      width: { xs: 1, md: "260px" },

      mb: "0",
      height: { xs: "60dvh", md: "50dvh" },
      backgroundImage: `url(${HomePageImages.homePageImg3})`,
      backgroundPosition: "top",
      backgroundSize: "cover",
    }),
    []
  );

  const secondEventStyles = useMemo(
    () => ({
      backgroundImage: `url(${images.manPhone})`,
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
      backgroundImage: "url('/manLaptop.jpg')",
    }),
    []
  );

  return (
    <Box
      sx={{ position: "relative", my: "4rem", overflow: "hidden" }}
      ref={sectionRef}
    >
      <Box
        sx={{
          width: { xs: 1, md: "85%" },
          mx: "auto",
          pt: "5rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={animationVariantsLeft}
          style={{ flex: 1 }}
        >
          <Box sx={leftEventStyles}>
            <EventCard sx={firstEventStyles} />

            <Box
              component="img"
              src="/img/pattern.png"
              alt="pattern"
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translate(-50%)",

                left: 70,
                width: 80,
              }}
            />
            <HeroBlog sx={{ ...defaultStyles }}>
              <Typography variant="body1">Упати се уште сега кон</Typography>
              <CustomButton
                style={{
                  position: "absolute",
                  right: "20%",
                  top: "25%",
                  transform: "translate(50%, 0)",
                }}
              >
                Нашиот блог
              </CustomButton>
            </HeroBlog>
            <EventCard sx={secondEventStyles} />
          </Box>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={animationVariantsRight}
          style={{ flex: 1 }}
        >
          <Box
            sx={{
              width: 1,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box sx={{ position: "absolute", left: "-35%" }}>
              <Typography variant="h3" fontWeight="600" sx={{ pb: "2rem" }}>
                Кажи ги своите мислења и поврзи се со останатите <br /> HR
                ентузијасти
              </Typography>
              <Typography variant="body2">
                Во нашиот блог отсега ке можеш да разменуваш мислења на <br />{" "}
                актуелни теми со останатите корисници
              </Typography>
            </Box>
            <EventCard sx={rightEventStyles} />
          </Box>
        </motion.div>
      </Box>
      <Background2 sx={{ position: "absolute", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default BlogsOverview;
