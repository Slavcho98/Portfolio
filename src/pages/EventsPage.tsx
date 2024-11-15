import CustomButton from "../ui/CustomButton";
import { Typography } from "@mui/material";
import HeroSection from "../ui/HeroSection";
import Banner from "../ui/Banner";
import HeroBlog from "../ui/HeroBlog";
import { EventsPageImages as images } from "../types/imagesTypes";
import CalendarSection from "../features/Calendar/CalendarSection";
import EventsHeader from "../ui/EventsPageComponents/EventsHeader";
import EventsCardFilter from "../ui/EventsPageComponents/EventsCardFilter";
import EventsFilter from "../ui/EventsPageComponents/EventsFilter";

function EventsPage() {
  return (
    <>
      <HeroSection>
        <Banner image1={images.eventsPageImg1} image2={images.eventsPageImg2}>
          <HeroBlog sx={{ left: "15%" }}>
            <Typography variant="button" sx={{ textTransform: "none" }}>
              Истакнат блог
            </Typography>{" "}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,

                py: "0.5rem",
                lineHeight: "1.3em",
              }}
            >
              HR Кафе
            </Typography>
            <Typography variant="h6" fontWeight={400} sx={{ fontSize: "1rem" }}>
              Овој четврток кафе на тема како да примените техники и <br />{" "}
              чекори од селф коучинг за подобро да се водите себеси.
            </Typography>
            <Typography variant="body2">20 Јуни, 2024</Typography>
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

      <CalendarSection />
      <EventsHeader>Сите настани</EventsHeader>
      <EventsFilter />
      <EventsCardFilter />
    </>
  );
}

export default EventsPage;
