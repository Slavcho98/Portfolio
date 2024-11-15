import { Box, Typography } from "@mui/material";
import UserBadge from "../UserBadge";

export default function TicketsBought() {
  return (
    <Box>
      <Typography variant="h4">Купени карти</Typography>
      <Box sx={{ pt: 3 }}>
        <Box
          sx={{
            backgroundColor: "#fff",
            width: "90%",
            boxShadow: "0px 9px 80px 0px #2F41581F",
            p: 2,
            borderRadius: "20px",
            display: "flex",
            mb: 2,
            position: "relative",
          }}
        >
          <UserBadge
            showImage
            sx={{
              backgroundImage: 'url("./img/conf.png")',
              borderRadius: "0 0 50vw 50vw",
              mt: 0,
              width: "150px",
              height: "120px",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ fontSize: "1.1rem" }}
            >
              HR кафе: Пoтребата од зајакнување на соработ...
            </Typography>
            <Typography variant="body2">
              25.07.2024 Лабораториум, Скопје
            </Typography>
          </UserBadge>
        </Box>

        <Box
          sx={{
            backgroundColor: "#fff",
            width: "90%",
            boxShadow: "0px 9px 80px 0px #2F41581F",
            p: 2,
            borderRadius: "20px",
            display: "flex",
          }}
        >
          <UserBadge
            showImage
            sx={{
              backgroundImage: 'url("./img/eventBanner.png")',
              borderRadius: "0 0 50vw 50vw",
              mt: 0,
              width: "150px",
              height: "120px",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ fontSize: "1.1rem" }}
            >
              13та меѓународна МАЧР конференција
            </Typography>
            <Typography variant="caption">
              24-25.12.2024 Хотел Континентал, Скопје
            </Typography>
          </UserBadge>
        </Box>
      </Box>
    </Box>
  );
}
