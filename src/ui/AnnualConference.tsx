import { Box, SxProps, Theme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ConferenceItem1 from "./ConferenceItem1";
import ConferenceItem2 from "./ConferenceItem2";

type AnnualConferenceProps = {
  sx?: SxProps<Theme>;
  conferenceItem1Sx?: SxProps<Theme>;
  profileImageSx1?: SxProps<Theme>;
  profileImageSx2?: SxProps<Theme>;
  showBadge?: boolean;
  showProfileImage?: boolean; 
  showProfileImage2?: boolean; 
};

function AnnualConference({
  sx,
  conferenceItem1Sx,
  profileImageSx1,
  profileImageSx2,
  showBadge = true, 
  showProfileImage = true, 
  showProfileImage2 = true, 
}: AnnualConferenceProps) {
  return (
    <Box
      sx={{
        width: "85%",
        pt: "5rem",
        mx: "auto",
        ...sx,
      }}
    >
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ position: "relative" }}
      >
        <Grid size={6}>
          <ConferenceItem2 />
        </Grid>

        <Grid size={6}>
          <ConferenceItem1
            sx={conferenceItem1Sx}
            profileImageSx1={profileImageSx1}
            profileImageSx2={profileImageSx2}
            showBadge={showBadge} 
            showProfileImage={showProfileImage} 
            showProfileImage2={showProfileImage2} 
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AnnualConference;
