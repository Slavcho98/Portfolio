import { Box, Typography } from "@mui/material";
import Banner from "../ui/Banner";
import HeroSection from "../ui/HeroSection";
import HeroBlog from "../ui/HeroBlog";
import CustomButton from "../ui/CustomButton";
import { HomePageImages as images } from "../types/imagesTypes";
import BlogsOverview from "../ui/HomePageComponents/BlogsOverview";
import EventsCarousel from "../ui/EventsCarousel";
import BlogsCards from "../ui/BlogsCards";
import { getCurrentEvents, getPopularSurveys } from "../services/apiEvents";
import Benefits from "../ui/Benefits";
import EventAnnualConference from "../ui/SingleEventComponents/EventAnnualConference";
import Grid from "@mui/material/Grid2";
import UserBadge from "../ui/UserBadge";
import ConferenceText from "../ui/SingleEventComponents/ConferenceText";
import ConferenceBanner from "../ui/SingleEventComponents/AnnualConferenceBanner";
import Badge from "../ui/Badge";
import ConferenceCircle from "../ui/SingleEventComponents/ConferenceCircle";
import AboutUsSection from "../ui/AboutPageComponents/AboutUsSection";
import PrimaryAboutContent from "../ui/AboutPageComponents/PrimaryCloudContent";
import SecondaryCloudContent from "../ui/AboutPageComponents/SecondaryCloudContent";

function Homepage() {
  return (
    <>
      <HeroSection>
        <Banner image1={images.homePageImg1} image2={images.homePageImg2}>
          <Box>
            <HeroBlog
              sx={{
                width: "50%",
                top: { xs: "20%", md: "45%" },
                transform: "translate(0, -50%)",
              }}
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
                Луѓето пред се!
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
                width: { xs: "80%", md: "40%" },
                backgroundColor: "#fff",
                p: 2,
                mt: { xs: 2, md: 10 },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transform: "translate(-50%)",
                position: "absolute",
                left: "40%",
                borderRadius: { xs: "0 50vw 50vw 0", md: "50vw" },
                boxShadow: "0px 30px 80px 0px #2F415833",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: { xs: "0.8rem", md: "1rem" },
                }}
              >
                Придружи ни се
              </Typography>
              <CustomButton
                style={{ transform: "translate(50%)", marginRight: "5rem" }}
              >
                Зачлени се
              </CustomButton>
            </Box>
          </Box>
        </Banner>
      </HeroSection>
      <EventsCarousel />
      <BlogsOverview />
      <Benefits />
      <BlogsCards queryFn={getCurrentEvents} queryKey="currentEvents">
        <Typography variant="h4">Актуелни настани</Typography>
      </BlogsCards>
      <EventAnnualConference>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <ConferenceText>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: ".8rem", md: "2.5rem" },
                fontWeight: { xs: 600, md: 400 },
              }}
            >
              Најголемиот HR настан на нашите простори - Годишната HR
              конференција на МАЧР
            </Typography>
            <Typography variant="caption" sx={{ mb: 2 }}>
              Меѓународна размена на искуства во полето на човечки ресурси и
              константно движење во чекор со светските трендови.
            </Typography>
            <UserBadge sx={{ width: 100, height: 70 }}>
              <Typography variant="subtitle1" sx={{ display: "block" }}>
                м-р Дарко Петровски
              </Typography>
              <Typography variant="caption" sx={{ display: "block" }}>
                Претседател на МАЧР
              </Typography>
            </UserBadge>
          </ConferenceText>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ConferenceBanner>
            <ConferenceCircle />
            <Badge
              title="Купи карта"
              subtitle="mhraconference.com"
              sx={{ bottom: 0 }}
            />
          </ConferenceBanner>
        </Grid>
      </EventAnnualConference>
      <BlogsCards queryFn={getPopularSurveys} queryKey="popularSurveys">
        <Typography variant="h4">Популарни истражувања</Typography>
      </BlogsCards>
      <AboutUsSection
        primaryContent={<PrimaryAboutContent />}
        secondaryContent={<SecondaryCloudContent />}
        badge={
          <Badge
            title="Купи карта"
            subtitle="mhraconference.com"
            sx={{ top: "50%", right: "27%" }}
          />
        }
        button={
          <CustomButton
            style={{
              position: "absolute",
              left: "80px",
              bottom: 0,
              transform: "translate(-50%)",
            }}
          >
            Повеќе за нас
          </CustomButton>
        }
      >
        <Typography variant="h5">
          Дознај повеќе за нас и <br />
          нашите цели и задачи!
        </Typography>
        <Typography variant="body2" pt={5}>
          Нашиот огранок за коучинг е формиран 22 април 2019 година <br /> и е
          првата мрежа за професионални ментори во земјава.
        </Typography>
      </AboutUsSection>
    </>
  );
}

export default Homepage;
