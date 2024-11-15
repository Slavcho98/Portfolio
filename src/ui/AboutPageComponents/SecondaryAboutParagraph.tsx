import { Box, Typography } from "@mui/material";

function SecondaryAboutParagraph() {
  return (
    <Box sx={{ width: "70%", pt: 5 }}>
      <Typography
        variant="h4"
        sx={{
          fontSize: "1.8em",
          mb: "1rem",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        мисија и визија
      </Typography>
      <Typography variant="h5" pb={2}>
        Македонска Асоцијација за <br /> Човечки Ресурси
      </Typography>
      <Typography variant="body2" pb={2}>
        МАЧР е стручно, невладино, непартиско и непрофитно здружение на граѓани
        формирано на 22 април 2009 година, заради вршење на дејности и
        активности поврзани со развојот на работната сила, промоција на
        управувањето со човечките ресурси, како и унапредување на професијата
        управување со човечки ресурси.
      </Typography>
      <Typography variant="body2">
        <span style={{ color: "#E87B22" }}>Мисија</span>: “Мисија на МАЧР е
        унапредување и развој на професијата менаџмент со човечките ресурси”.
      </Typography>
      <Typography variant="body2">
        <span style={{ color: "#E87B22" }}>Визија</span>: “Визија на МАЧР е
        развој на луѓето и организациите!”
      </Typography>
    </Box>
  );
}

export default SecondaryAboutParagraph;
