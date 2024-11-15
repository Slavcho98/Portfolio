import { Box, Typography } from "@mui/material";

export default function MemberBenefits() {
  return (
    <Box sx={{ width: "85%", mx: "auto" }}>
      <Box sx={{ display: "flex" }}>
        <Box width={1 / 2}>
          <Box
            sx={{
              width: "100%",
              minHeight: "40vh",
              borderRadius: "50vw 50vw 0 0",
              backgroundPosition: "top",
              backgroundSize: "120%", 
              backgroundImage: "url('/img/benefits1.jpg')",
            }}
          />
          <Box>
            <Typography variant="h5" sx={{ pt: 3 }}>
              Бенефити од <br />
              индивидуално <br /> зачленување
            </Typography>
            <Box component="ul" sx={{ pl: 2, pt: 5, listStyleType: "disc" }}>
              <Typography component="li" sx={{ mb: 1, fontSize: ".8em" }}>
                Претставник во корпоративниот одбор на МАЧР
              </Typography>
              <Typography component="li" sx={{ mb: 1, fontSize: ".8em" }}>
                Можности за промоција на вашата компанија
              </Typography>
              <Typography component="li" sx={{ mb: 1, fontSize: ".8em" }}>
                Ширење на мрежата регионално и интернационално
              </Typography>
              <Typography component="li" sx={{ mb: 1, fontSize: ".8em" }}>
                Попусти на HR настани, обуки, конференции и сл.
              </Typography>
              <Typography component="li" sx={{ mb: 1, fontSize: ".8em" }}>
                HR огласи за работа
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          width={1 / 2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h5">
              Бенефити од <br /> корпоративно <br /> зачленување
            </Typography>
            <Box component="ul" sx={{ pl: 2, pt: 3, listStyleType: "disc" }}>
              <Typography component="li" sx={{ mb: 1, fontSize: ".8em" }}>
                Претставник во корпоративниот одбор на МАЧР
              </Typography>
              <Typography component="li" sx={{ mb: 1, fontSize: ".8em" }}>
                Можности за промоција на вашата компанија
              </Typography>
              <Typography component="li" sx={{ mb: 1, fontSize: ".8em" }}>
                Ширење на мрежата регионално и интернационално
              </Typography>
              <Typography component="li" sx={{ mb: 1, fontSize: ".8em" }}>
                Попусти на HR настани, обуки, конференции и сл.
              </Typography>
              <Typography component="li" sx={{ mb: 1, fontSize: ".8em" }}>
                HR огласи за работа
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              minHeight: "40vh",
              borderRadius: "0 0 50vw 50vw",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: "url('/img/benefits2.jpg')",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
