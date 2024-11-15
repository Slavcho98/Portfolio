import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getHRwebinar } from "../services/apiEvents";
import BlogHero from "../ui/SingleBlogPageComponents/BlogHero";
import EventsCarousel from "../ui/EventsCarousel";
import Navigation from "../ui/SingleEventComponents/Navigation";
// import EventAgenda from "../ui/SingleEventComponents/EventAgenda";
import EventSpeakers from "../ui/SingleEventComponents/EventSpeakers";
import Prices from "../ui/SingleEventComponents/Prices";
import BlogsCards from "../ui/BlogsCards";
import EventAnnualConference from "../ui/SingleEventComponents/EventAnnualConference";
import ConferenceBanner from "../ui/SingleEventComponents/AnnualConferenceBanner";
import ConferenceText from "../ui/SingleEventComponents/ConferenceText";
import Badge from "../ui/Badge";
import Background3 from "../ui/Background3";
import AgendaList from "../ui/ConferencePageComponents/AgendaList";

function EventPage() {
  return (
    <>
      <BlogHero sx={{ backgroundImage: "url('./public/img/eventBanner.png')" }}>
      <Typography variant="body1" sx={{ mb: 2 }}>
         Настан
            </Typography>
            <Typography variant="h4">
            HR Кафе
            </Typography>
            <Typography variant="h5" sx={{ mt: "2rem" }}>
            l 25 Јули, 2024   
            </Typography>
      
      </BlogHero>
      <EventsCarousel />
      <Navigation />
      <Box sx={{ position: "relative", pb: 20, }}>
        <EventAnnualConference>
          <Typography variant="h4" fontWeight={600} sx={{pt: 5}}>
            HR кафе
          </Typography>
          <Typography textTransform="uppercase" variant="h5" fontWeight={500}>
            тема: „потребата од зајакнување на соработката помеѓу hr одделот и
            претставникот на вработените (синдикатот), со цел унапредување на
            работната организација“
          </Typography>
          <Grid size={6} sx={{ pt: 10, pb: 15 }}>
            <ConferenceText >
              <Typography variant="body1">
                <Typography variant="h4" sx={{ pb: 5 }}>
                  Опис:
                </Typography>
                Опис: Овој настан има за цел да ја истакне важноста од тесната
                соработка меѓу HR одделот и претставникот на вработените
                (синдикатот) во организациите. Преку овој настан ќе ги
                разгледаме најдобрите практики, предизвиците и можностите кои се
                јавуваат при заедничката работа на овие две страни, со цел
                подобрување на работната атмосфера и организациската ефикасност.
                Учесниците ќе имаат можност да слушнат од експерти во областа,
                да дискутираат за своите искуства и да пронајдат нови начини за
                унапредување на соработката.
              </Typography>
              <Typography variant="body1">
                <Typography variant="h4" sx={{ py: 5 }}>
                  Цел:
                </Typography>
                Целта на овој HR кафе настан е да се создаде платформа за
                отворена комуникација и размена на идеи која ќе придонесе за
                подобра соработка меѓу HR одделот и синдикатот, што ќе резултира
                со позитивни промени во работната организација.
              </Typography>
            </ConferenceText>
          </Grid>
          <Grid size={6} sx={{ py: 10 }}>
            <ConferenceBanner
              sx={{ backgroundImage: "url('./public/img/eventBanner2.png')" }}
            >
              <Badge
                title="Купи карта"
                subtitle="mhraconference.com"
                sx={{ bottom: "30px" }}
              />
            </ConferenceBanner>
          </Grid>
        </EventAnnualConference>
        <Background3 />
      </Box>

      {/* <EventAgenda /> */}
      <AgendaList title="Агенда на настанот"/>
      <EventSpeakers />
      <Prices />
      <BlogsCards queryFn={getHRwebinar} queryKey="HRwebinar">
        <Typography variant="h4">Слични настани</Typography>
      </BlogsCards>
    </>
  );
}
export default EventPage;
