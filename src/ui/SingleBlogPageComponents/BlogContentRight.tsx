import { Box, Stack, Typography } from "@mui/material";

import SocialMedia from "../../ui/SocialMedia";
import EventCard from "../EventCard";

const contentItems = [
  "Прецизно дефинирање на позицијата",
  "Развивање на ефикасна стратегија за привлекување кандидати",
  "Спроведување на структуриран процес на интервју",
  "Вклучување на релевантни тестови и проценки",
  "Донесување на информирана одлука",
  "Заклучок",
  "Коментари"
];

export default function BlogContentRight() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <EventCard
        sx={{
          width: 250,
          ml: "auto",
          backgroundImage: 'url("./public/img/Gjoko.jpg")',
        }}
      />

      <Box sx={{ position: "relative", display: "flex" }}>
        <Typography variant="body1">Ѓоко Вукановски</Typography>
       
      </Box>
      
      <SocialMedia
        sx={{
          position: "static",
          width: "300px",
          borderRadius: "10vw",
          textWrap: "nowrap",
          my: 5,
          pl: 4,
          backgroundColor: "#E87B22",
        }}
      >
        Сподели со колегите
      </SocialMedia>
      
      <Stack>
        <Box sx={{ borderLeft: "4px solid #E87B22", py: 1, px: 1 }}>
          <Typography variant="h6" sx={{ color: "#E87B22" }}>
            Кратка содржина
          </Typography>
        </Box>

        <Box sx={{ pt: 2.5 }}>
          {contentItems.map((item, index) => (
            <Box key={index} sx={{ mb: 2.5 }}>
              <Typography variant="body2">{item}</Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
