import { Box, Stack, Typography } from "@mui/material";
import Calendar from "../../features/Calendar/Calendar";
import Grid from "@mui/material/Grid2";
import BreadCrumbs from "../../ui/Breadcrumbs";
import Uploader from "../../data/Uploader";

const breadcrumbs = [
  { label: "Почетна", link: "/" },
  { label: "Настани", isCurrent: true },
];

export default function CalendarSection() {
  return (
    <Box sx={{ width: "85%", mx: "auto", pt: "5rem", pb: "10rem" }}>
      <Stack direction="row" justifyContent="space-between">
        <BreadCrumbs breadcrumbs={breadcrumbs} />
        <Uploader />
      </Stack>
      <Grid container spacing={10} sx={{ pt: 5 }}>
        <Grid size={5}>
          <Box>
            <Typography variant="h3">
              Календар со датуми за сите претстојни настани
            </Typography>
            <Typography variant="caption">
              Погледни ги сите настани распоредени на календар. Со клик на
              обележаните настани можеш да дознаеш повеќе информации за секој од
              настаните но за целосни информации упатете се до индивидуалната
              страна на настанот
            </Typography>
          </Box>
        </Grid>
        <Grid size={7}>
          <Calendar />
        </Grid>
      </Grid>
    </Box>
  );
}
