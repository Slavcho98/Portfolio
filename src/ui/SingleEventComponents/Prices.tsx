import { Box, Typography } from "@mui/material";
import CustomButton from "../../ui/CustomButton";
import Badge from "../Badge";


export default function Prices() {
  return (
    <Box sx={{ width: "85%", mx: "auto" }}>
      <Box sx={{ display: "flex", pb: 10 }}>
        <Box sx={{ width: 1 / 2, textAlign: "center" }}>
          <Box
            sx={{
              px: 1,
              pt: 3,
              pb: 5,
              borderTop: 1,
              borderLeft: 1,
              borderRadius: "10vw 0 0 0 ",
              borderColor: "#0000001A",
            }}
          >
            <Typography variant="h4" fontWeight={600}>
              Цена за поединци
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={600}>
            500мкд
          </Typography>
        </Box>
        <Box sx={{ width: 1 / 2, textAlign: "center" }}>
          <Box
            sx={{
              px: 1,
              pt: 3,
              pb: 5,
              borderTop: 1,
              borderRight: 1,
              borderLeft: 1,
              borderRadius: "0 10vw 0 0 ",
              borderColor: "#0000001A",
            }}
          >
            <Typography variant="h4" fontWeight={600}>
              Цена за компании
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={600}>
            5000мкд
          </Typography>
        </Box>
      </Box>
      <Box sx={{ position: "relative", mb: 3, pb: 2, pt: 4 }}>
        <Box
          sx={{
            height: "60vh",
            width: 1,
            backgroundSize: "cover",
            backgroundImage: "url('./public/img/Banner.jpg')",
            borderRadius: "50vw",
          }}
        >
          <Badge
            sx={{ left: "50%", top: 0, transform: "translate(-50%)" }}
            title="Купи карта"
            subtitle="mhraconference.com"
          />
        </Box>

        <CustomButton
          style={{
            minWidth: 170,
            position: "absolute",
            left: "50%",
            bottom: 0,
            transform: "translate(-50%)",
          }}
        >
          Предложи на пријател
        </CustomButton>
      </Box>
    </Box>
  );
}
