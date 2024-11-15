import { Box, Typography } from "@mui/material";
import BreadCrumbs from "../Breadcrumbs";

const breadcrumbs = [
  { label: "Почетна", link: "/" },
  { label: "Настани", isCurrent: true },
];


function ActivityRewards() {
  return (
    <Box sx={{ width: "85%", pt: 8, mx: "auto" }}>
      <BreadCrumbs breadcrumbs={breadcrumbs}/>
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          pt: 2,
          pb: 8
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: "50vw 50vw 0 0",
            width: "280px",
            height: "40dvh",
            backgroundColor: "yellow",
            backgroundImage: 'url("/img/trophey_guy.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top",
            color: "#fff",
            flexShrink: 0,
          }}
        ></Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            ml: "2rem",
          }}
        >
          <Typography variant="h4" sx={{ fontSize: "2rem", pt: "1rem" }}>
            Биди <span style={{ color: "#E87B22" }}>активен/на</span>,
            споделувај настани на социјалните медиуми, собирај поени, добивај
            значки и рамки, кани пријатели на настани и освојувај попусти за
            следната купена карта
          </Typography>
          <Typography variant="body2" sx={{ fontSize: ".8rem" }}>
            Дококлу овој месец си најактивен/а во форумот добиваш награди за да
            го направиш твојот профил уникатен, а ако каниш пријатели и тие
            купат карта преку твојот линк за покана добиваш попуст на следната
            купена карта за настан.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ActivityRewards;