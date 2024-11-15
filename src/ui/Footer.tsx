import { Box, Stack, TextField, Typography } from "@mui/material";
import Logo from "./Logo";
import SocialMediaIcons from "./SocialMediaIcons"; // Import the SocialMediaIcons component

export default function Footer() {
  return (
    <Box sx={{ width: "85%", mx: "auto", borderTop: 1, mt: 20, py: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <Box sx={{ width: "50%" }}>
          <Typography fontWeight={600}>Претплати се на билтен</Typography>
          <TextField
            type="email"
            fullWidth
            label="Е-маил"
            id="fullWidth"
            sx={{
              mt: 2,
              "& .MuiInputBase-root": {
                borderRadius: "50vw",
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& legend ": {
                  ml: 1,
                },
              },
              "& label": {
                ml: 1,
              },
              "& label.Mui-focused": {
                color: "#E87B22",
                ml: 1,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E87B22 !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E87B22 !important",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E87B22 !important",
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={4} sx={{ pt: 8 }}>
          <Box>
            <Typography variant="body1" fontWeight={600}>
              Адреса
            </Typography>
            <Typography variant="caption">
              Бул. ВМРО бр. 7/1-7 <br /> 1000 Скопје, Македонија
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" fontWeight={600}>
              Е-маил
            </Typography>
            <Typography variant="caption">contact@mhra.mk</Typography>
          </Box>
        </Stack>
        <SocialMediaIcons />
      </Box>
    </Box>
  );
}
