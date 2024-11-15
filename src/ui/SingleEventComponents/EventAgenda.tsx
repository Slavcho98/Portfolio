import { Box, Divider, Typography } from "@mui/material";

export default function EventAgenda() {
  return (
    <Box sx={{ width: "85%", mx: "auto", py: 10 }}>
      <Typography variant="h6">Агенда на настанот</Typography>
      <Box sx={{width: "60%", py: 3}}>
        <Typography variant="body1">Четврток, 25 Јули</Typography>
        <Divider sx={{pt: 2}}/>
      </Box>
      <Box sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", pb: 2.5 }}>
          <Box>
            <Typography variant="body1">10:00</Typography>
          </Box>
          <Box sx={{ pl: 4 }}>
            <Typography variant="h6" fontSize="1.1em">
              | Регистрација и утринско кафе
            </Typography>
            <Typography component="li" variant="body1" sx={{ pl: 1.5 }}>
              Пристигнување и неформално запознавање меѓу учесниците.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", pb: 2.5 }}>
          <Box>
            <Typography variant="body1">10:00</Typography>
          </Box>
          <Box sx={{ pl: 4 }}>
            <Typography variant="h6" fontSize="1.1em">
              | Вовед и отворање на настанот
            </Typography>
            <Typography component="li" variant="body1" sx={{ pl: 1.5 }}>
              Поздравен говор од организаторот и кратко претставување на
              агендата.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", pb: 2.5 }}>
          <Box>
            <Typography variant="body1">10:00</Typography>
          </Box>
          <Box sx={{ pl: 4 }}>
            <Typography variant="h6" fontSize="1.1em">
              | Регистрација и утринско кафе
            </Typography>
            <Typography component="li" variant="body1" sx={{ pl: 1.5 }}>
              Пристигнување и неформално запознавање меѓу учесниците.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", pb: 2.5 }}>
          <Box>
            <Typography variant="body1">10:00</Typography>
          </Box>
          <Box sx={{ pl: 4 }}>
            <Typography variant="h6" fontSize="1.1em">
              | Регистрација и утринско кафе
            </Typography>
            <Typography component="li" variant="body1" sx={{ pl: 1.5 }}>
              Пристигнување и неформално запознавање меѓу учесниците.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", pb: 2.5 }}>
          <Box>
            <Typography variant="body1">10:00</Typography>
          </Box>
          <Box sx={{ pl: 4 }}>
            <Typography variant="h6" fontSize="1.1em">
              | Регистрација и утринско кафе
            </Typography>
            <Typography component="li" variant="body1" sx={{ pl: 1.5 }}>
              Пристигнување и неформално запознавање меѓу учесниците.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
