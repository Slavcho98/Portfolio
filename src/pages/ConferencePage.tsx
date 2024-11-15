import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import BlogsCards from "../ui/BlogsCards";
import AgendaList from "../ui/ConferencePageComponents/AgendaList";
import FactsContainer from "../ui/ConferencePageComponents/FactsContainer";
import Packages from "../ui/ConferencePageComponents/Packages";
import SpecialGuestsList from "../ui/ConferencePageComponents/SpecialGuestsList";
import TestimonialsList from "../ui/ConferencePageComponents/TestimonialsList";
import EventsCarousel from "../ui/EventsCarousel";
import MainBackground from "../ui/MainBackground";
import { getHRwebinar, getNewestBlogs } from "../services/apiEvents";
import BlogHero from "../ui/SingleBlogPageComponents/BlogHero";
import EventAnnualConference from "../ui/SingleEventComponents/EventAnnualConference";
import ConferenceText from "../ui/SingleEventComponents/ConferenceText";
import ConferenceBanner from "../ui/SingleEventComponents/AnnualConferenceBanner";
import Badge from "../ui/Badge";
import ConferenceCircle from "../ui/SingleEventComponents/ConferenceCircle";
import Map from "../ui/ConferencePageComponents/Map";

function Conference() {
  return (
    <>
      <BlogHero sx={{ backgroundImage: "url('/img/conf.png')" }}>
      <Typography variant="body1" sx={{ mb: 2 }}>
         Настан
            </Typography>
            <Typography variant="h4">
            13та меѓународна МАЧР конференција
            </Typography>
            <Typography variant="h5" sx={{ mt: "2rem" }}>
            l 24-25 Декември, 2024   
            </Typography>
      
      </BlogHero>
      <EventsCarousel />

      <EventAnnualConference>
        <Grid size={6} sx={{pt: 5}}>
          <ConferenceText sx={{ justifyContent: "flex-start" }}>
            <Typography
              variant="h3"
              sx={{ fontSize: "2.5em", fontWeight: 600 }}
            >
              13та меѓународна <br /> МАЧР конференција
            </Typography>
            <Stack direction="row" spacing={5} sx={{ py: 4 }}>
              <Typography variant="body2">24-25 Декември, 2024</Typography>
              <Typography variant="body2">Хотел Континентал, Скопје</Typography>
            </Stack>
            <Typography variant="caption" sx={{ pb: 5 }}>
              Годишната меѓународна HR конференција, организирана од страна на
              Македонска асоцијација за човечки ресурси, има за цел да ги
              истражи и презентира најновите трендови и практики во областа на
              човечките ресурси кои ќе им помогнат на организациите да станат
              "future fit". Оваа конференција ќе ги собере најдобрите умови и
              лидери во HR за да дискутираат и разменат идеи за проактивни
              стратегии кои можат да ја трансформираат работната сила и да ја
              унапредат организациската ефикасност.
            </Typography>
            <Badge
              title="Купи карта"
              subtitle="mhraconference.com"
              sx={{ transform: "none", position: "static" }}
            />
          </ConferenceText>
        </Grid>
        <Grid size={6}  sx={{pt: 5}}>
          <ConferenceBanner
            sx={{
              position: "relative",
              height: "70vh",
              width: "70%",
              backgroundImage: "url('/img/president.jpg')",
              borderRadius: "50vw 50vw 0 0",
              border: 1,
            }}
          >
            <ConferenceCircle
              sx={{ right: "-3em", left: "none", width: 200, height: 200 }}
              innerSx={{
                backgroundImage: 'url("/img/conference.jpg")',
                backgroundPosition: "center",
                backgroundSize: "500%",
              }}
            />
            <ConferenceCircle
              sx={{ bottom: "3em", left: "4em", top: "none" }}
            />
          </ConferenceBanner>
        </Grid>
      </EventAnnualConference>
      <FactsContainer />
      <SpecialGuestsList />
      <MainBackground />
      <AgendaList title="Агенда на конференцијата"/>
      <MainBackground />
      <TestimonialsList />
      <Packages />
      <Map/>
      <BlogsCards queryFn={getNewestBlogs} queryKey="newestBlogs">
        <Typography variant="h4">Најнови блогови</Typography>
      </BlogsCards>
      <BlogsCards queryFn={getHRwebinar} queryKey="HRwebinar">
        <Typography variant="h4">Слични блогови</Typography>
      </BlogsCards>
    </>
  );
}

export default Conference;
