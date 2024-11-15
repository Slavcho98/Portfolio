import { Box, SxProps, Theme } from "@mui/material";
import Badge from "./Badge";

type Props = {
  sx?: SxProps<Theme>;
  profileImageSx2?: SxProps<Theme>;
  profileImageSx1?: SxProps<Theme>;
  showBadge?: boolean;
  showProfileImage?: boolean;
  showProfileImage2?: boolean;
};

export default function ConferenceItem1({
  sx,
  profileImageSx1,
  profileImageSx2,
  showBadge = true,
  showProfileImage = true,
  showProfileImage2 = true,
}: Props) {
  return (
    <Box sx={{ position: "relative", height: "90vh" }}>
      <Box
        sx={{
          width: "60%",
          height: "100%",
          ml: "auto",
          borderRadius: "20vw",
          overflow: "hidden",
          backgroundImage: 'url("./public/img/conference.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
          position: "relative",
          ...sx,
        }}
      />

      {showProfileImage && (
        <Box
          sx={{
            border: "1px solid #3C636A",
            position: "absolute",
            left: "25%",
            top: 0,
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            ...profileImageSx2,
          }}
        >
          <Box
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundImage: 'url("./public/img/president.jpg")',
              backgroundSize: "160%",
              backgroundPosition: "20px right",
              backgroundRepeat: "no-repeat",
              border: "1px solid black",
              ...profileImageSx1,
            }}
          />
        </Box>
      )}
      {showProfileImage2 && (
        <Box
          sx={{
            border: "1px solid #3C636A",
            position: "absolute",
           
            top: 0,
            left: 0,
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            ...profileImageSx2,
          }}
        >
          <Box
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundImage: 'url("./public/img/president.jpg")',
              backgroundSize: "160%",
              backgroundPosition: "20px right",
              backgroundRepeat: "no-repeat",
              border: "1px solid black",
              ...profileImageSx1,
            }}
          />
        </Box>
      )}

      {showBadge && (
        <Badge
          title="Купи карта"
          subtitle="mhraconference.com"
          sx={{ bottom: "10%" }}
        />
      )}
    </Box>
  );
}
