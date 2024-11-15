import { Box, Typography } from "@mui/material";

const TextContent = () => (
  <Box sx={{ position: "absolute", left: "-35%" }}>
    <Typography variant="h3" fontWeight="600" sx={{ pb: "2rem" }}>
      Кажи ги своите мислења и поврзи се со останатите <br /> HR ентузијасти
    </Typography>
    <Typography variant="body2">
      Во нашиот блог отсега ке можеш да разменуваш мислења на <br /> актуелни теми со останатите корисници
    </Typography>
  </Box>
);

export default TextContent;
