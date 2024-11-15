import { Box, Typography } from "@mui/material";
import { AboutUsPageImages as images } from "../types/imagesTypes";
import Board from "../ui/AboutPageComponents/Board";
import President from "../ui/AboutPageComponents/President";
import EventsCarousel from "../ui/EventsCarousel";
import HeroSection from "../ui/HeroSection";
import HeroBlog from "../ui/HeroBlog";
import Banner from "../ui/Banner";
import CustomButton from "../ui/CustomButton";
import AboutUsSection from "../ui/AboutPageComponents/AboutUsSection";
import SecondaryAboutParagraph from "../ui/AboutPageComponents/SecondaryAboutParagraph";
import PrimaryAboutParagraph from "../ui/AboutPageComponents/PrimaryAboutParagraph";

export default function AboutUsPage() {
  return (
    <>
      <HeroSection>
        <Banner image1={images.aboutUsPageImg1} image2={images.aboutUsPageImg2}>
          <HeroBlog
            sx={{ width: "50%", top: "45%", transform: "translate(0, -50%)" }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "0.8rem", md: "2.6rem" },
                py: "0.5rem",
                lineHeight: "1.3em",
              }}
            >
              Запознај го тимот
            </Typography>
            <Typography
              variant="h6"
              fontWeight={400}
              sx={{ fontSize: { xs: ".7rem", sm: ".7rem", md: "1rem" } }}
            >
              Македонска Асоцијација за Човечки Ресурси
            </Typography>
          </HeroBlog>
          <Box
            sx={{
              width: "40%",
              backgroundColor: "#fff",
              p: 2,
              mt: 30,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transform: "translate(-50%)",
              position: "absolute",
              left: "40%",
              borderRadius: "50vw",
              boxShadow: "0px 30px 80px 0px #2F415833",
            }}
          >
            <Typography
              variant="body2"
              sx={{ whiteSpace: "nowrap", fontSize: "1em" }}
            >
              Придружи ни се
            </Typography>
            <CustomButton
              style={{ transform: "translate(50%)", marginRight: "5rem" }}
            >
              Зачлени се
            </CustomButton>
          </Box>
        </Banner>
      </HeroSection>
      <EventsCarousel />
      <AboutUsSection
        primaryContent={<PrimaryAboutParagraph />}
        secondaryContent={<SecondaryAboutParagraph />}
      />
      <President />
      <Board />
    </>
  );
}
