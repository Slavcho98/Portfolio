import { Box } from "@mui/material";

import BlogContentRight from "./BlogContentRight";
import Grid from "@mui/material/Grid2";
import BlogContentLeft from "./BlogContentLeft";

export default function BlogContent() {
  return (
    <Box sx={{ width: "85%", mx: "auto", my: "5rem" }}>
      <Grid container spacing={8}>
        <Grid size={8}>
          <BlogContentLeft />
        </Grid>
        <Grid size={4}>
          <BlogContentRight />
        </Grid>
      </Grid>
    </Box>
  );
}
