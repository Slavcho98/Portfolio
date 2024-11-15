import { Box, Typography } from "@mui/material";

function PrimaryAboutParagraph() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontSize: "1.8em", mb: "1rem" }}>
        Цели и задачи:
      </Typography>
      <Typography variant="body2" pb={2}>
        <span style={{ color: "#E87B22" }}>ПОДДРШКА</span> на највисоките идеали
        во областа на управувањето со човечки ресурси и посестрано прифаќање и
        ценење на професијата;
      </Typography>
      <Typography variant="body2" pb={2}>
        <span style={{ color: "#E87B22" }}>ПРИЗНАВАЊЕ</span> на управувањето со
        човечки ресурси поради неговиот придонес за успешно работење и
        зајакнување на способноста и кредибилитетот на професијата управување со
        човечки ресурси;
      </Typography>
      <Typography variant="body2">
        <span style={{ color: "#E87B22" }}> СТРЕМЕЖ </span> да бидеме водачи во
        развојот и промовирањето на добрите практики во професијата управување
        со човечки ресурси, што ќе ги применуваат и професионалните членови и
        нивните колеги и да ги поставиме основните национални стандарди за
        управување со човечки ресурси; Лобирање кај владата и поднесување на
        документи во име на членовите и трети лица.
      </Typography>
    </Box>
  );
}

export default PrimaryAboutParagraph;
