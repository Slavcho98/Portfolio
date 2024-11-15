import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";
import Grid from "@mui/material/Grid2";
import BreadCrumbs from "../Breadcrumbs";

type Props = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

const breadcrumbs = [
  { label: "Почетна", link: "/" },
  { label: "Годишна конференција", isCurrent: true },
];

function EventAnnualConference({ children, sx }: Props) {
  return (
    <Box
      sx={{
        width: { xs: 1, md: "85%" },
        pt: "5rem",
        mx: "auto",
        ...sx,
      }}
    >
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ position: "relative" }}
      >
        {children}
      </Grid>
    </Box>
  );
}

export default EventAnnualConference;
