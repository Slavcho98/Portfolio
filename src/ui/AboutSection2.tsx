import { Box, Typography } from "@mui/material";
import EventCard from "./EventCard";

export default function AboutSection2() {
  return (
    <Box sx={{ position: "relative", pb: 10 }}>
      <img
        src="/img/whiteElement2.png"
        style={{
          position: "absolute",
          zIndex: "-1",
          right: 0,
          maxWidth: "100%",
          height: "55dvh",
          objectFit: "cover",
        }}
      />
      <img
        src="/img/whiteElement3.png"
        style={{
          position: "absolute",
          zIndex: "-1",
          left: "0",
          bottom: 0,
          maxWidth: "100%",
          height: "55dvh",
          objectFit: "cover",
        }}
      />
      <Box sx={{ width: "85%", mx: "auto", py: 10, position: "relative" }}>
        <Box sx={{ minHeight: "80dvh" }}>
          <Box
            sx={{ width: 1, display: "flex", justifyContent: "space-between", position: "relative" }}
          >
            <EventCard
              sx={{
                borderRadius: "10vw 10vw 0 0",
                width: 260,
                height: "50dvh",
                pb: "1rem",
                backgroundImage: "url('./public/img/girl1.png')",
              }}
            />
            <Box sx={{ width: "70%", pt: 5 }}>
              <Typography variant="h4" sx={{ fontSize: "1.8em", mb: "1rem", textTransform: "uppercase", fontWeight: 600}}>
           мисија и визија
              </Typography>
              <Typography variant="h5" pb={2}>
                Македонска Асоцијација за <br /> Човечки Ресурси
              </Typography>
              <Typography variant="body2" pb={2}>
                МАЧР е стручно, невладино, непартиско и непрофитно здружение на
                граѓани формирано на 22 април 2009 година, заради вршење на
                дејности и активности поврзани со развојот на работната сила,
                промоција на управувањето со човечките ресурси, како и
                унапредување на професијата управување со човечки ресурси.
              </Typography>
              <Typography variant="body2">
              <span  style={{color:"#E87B22"}} >Мисија</span>: “Мисија на МАЧР е унапредување и развој на професијата
                менаџмент со човечките ресурси”.
              </Typography>
              <Typography variant="body2">
              <span  style={{color:"#E87B22"}} >Визија</span>: “Визија на МАЧР е развој на луѓето и организациите!”
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: 1,
              alignSelf: "flex-end",
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
          
            }}
          >
            <Box sx={{ width: "70%" }}>
              <Typography variant="h4" sx={{ fontSize: "1.8em", mb: "1rem" }}>
                Цели и задачи:
              </Typography>
              <Typography variant="body2" pb={2}>
                <span style={{ color: "#E87B22" }}>ПОДДРШКА</span> на
                највисоките идеали во областа на управувањето со човечки ресурси
                и посестрано прифаќање и ценење на професијата;
              </Typography>
              <Typography variant="body2" pb={2}>
                <span style={{ color: "#E87B22" }}>ПРИЗНАВАЊЕ</span> на
                управувањето со човечки ресурси поради неговиот придонес за
                успешно работење и зајакнување на способноста и кредибилитетот
                на професијата управување со човечки ресурси;
              </Typography>
              <Typography variant="body2">
                <span style={{ color: "#E87B22" }}> СТРЕМЕЖ </span> да бидеме
                водачи во развојот и промовирањето на добрите практики во
                професијата управување со човечки ресурси, што ќе ги применуваат
                и професионалните членови и нивните колеги и да ги поставиме
                основните национални стандарди за управување со човечки ресурси;
                Лобирање кај владата и поднесување на документи во име на
                членовите и трети лица.
              </Typography>
            </Box>
            <EventCard
              borderRadius="0 0 50vw 50vw"
              sx={{
                mb: 0,
                width: "230px",
                height: "40dvh",
                backgroundImage: "url('./public/img/girl2.png')",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
