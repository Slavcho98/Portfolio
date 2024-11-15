import { Typography } from "@mui/material";
import Banner from "../ui/Banner";
import HeroBlog from "../ui/HeroBlog";
import HeroSection from "../ui/HeroSection";
import CustomButton from "../ui/CustomButton";
import { images } from "../types/imagesTypes";
import EventsCarousel from "../ui/EventsCarousel";
import ActivityRewards from "../ui/BlogsPageComponent/ActivityRewards";
import NewestBlogs from "../ui/BlogsPageComponent/NewestBlogs";
import Background2 from "../ui/Background2";
import EventsHeader from "../ui/EventsPageComponents/EventsHeader";
import BlogsList from "../ui/BlogsPageComponent/BlogsList";
import AllBlogs from "../ui/BlogsPageComponent/AllBlogs";

function Blogspage() {
  return (
    <>
      <HeroSection>
        <Banner image1={images.bannerImage1} image2={images.bannerImage2}>
          <HeroBlog>
            <Typography variant="button" sx={{ textTransform: "none" }}>
              Истакнат блог
            </Typography>{" "}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1em", lg: "2.6em" },
                py: "0.5rem",
                lineHeight: "1.3em",
              }}
            >
              Како до најдобар избор при <br /> процесот на регрутација
            </Typography>
            <Typography>
              Од <span style={{ color: "#E87B22" }}>Ѓоко Вукановски</span> | 20
              Јуни, 2024
            </Typography>
            <CustomButton
            
              style={{
                position: "absolute",
                left: "auto",
                right: "20%",
                top: "90%",
                transform: "translate(50%)",
              }}
            >
              Прочитај повеќе
            </CustomButton>
          </HeroBlog>
        </Banner>
      </HeroSection>
      <EventsCarousel />
      <ActivityRewards />
      <EventsHeader>Најнови блогови</EventsHeader>

      <BlogsList />
      <NewestBlogs />
      <Background2 />
      <AllBlogs />
    </>
  );
}

export default Blogspage;
