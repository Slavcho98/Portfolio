import { Box, Typography } from "@mui/material";
import EventCard from "./EventCard";

interface EventProps {
  title: string;
  month: string;
  date: number;
  image: string;
  lowResImg: string;
}

interface CarouselItemProps {
  events: EventProps[];
}

export const CarouselItem = ({ events }: CarouselItemProps) => {
  return (
    <Box sx={{ display: "flex", gap: 4 }}>
      {events.map((event, index) => (
        <EventCard
          showOverlay
          sx={{
            width: "250px",
            height: "20dvh",
            backgroundImage: `url('${event.image}')`,
          }}
          key={index}
        >
          <Typography variant="h6" sx={{ mb: ".7rem", fontSize: "1em" }}>
            {event.title}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "2rem" }}>
            {event.month}
          </Typography>
          <Box
            sx={{
              width: "80px",
              borderRadius: "10px",
              mx: "auto",
              border: "4px solid #fff",
            }}
          >
            <Typography variant="button" sx={{ fontSize: "2.5rem" }}>
              {String(event.date).padStart(2, "0")}
            </Typography>
          </Box>
        </EventCard>
      ))}
    </Box>
  );
};
