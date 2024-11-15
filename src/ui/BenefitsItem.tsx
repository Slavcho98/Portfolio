import { Box, Typography, Link } from "@mui/material";

function BenefitsItem() {
  const benefitsArray = [
    "Едукативни настани",
    "Најнови информации и случувања",
    "Ширење на мрежата на контакти",
    "Вклучување во работењето на МАЧР",
    "HR огласи за работа",
  ];

  return (
    <Box sx={{ width: "100%", pt: "4rem" }}>
      {benefitsArray.map((benefit, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            py: 2,
            mb: 2,
            borderBottom: "1px solid #21383E",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Box sx={{ width: "30px", textAlign: "center" }}>
              <span style={{ color: "#21383E" }}>
                {(index + 1).toString().padStart(2, "0")}
              </span>
            </Box>
            <Typography variant="h5" sx={{ ml: 4 }}>
              {benefit}
            </Typography>
          </Box>
          <Link
            sx={{ fontSize: "0.875rem", mt: 0.5, ml: "64px", color: "#21383E" }}
          >
            Прочитај повеќе
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default BenefitsItem;
