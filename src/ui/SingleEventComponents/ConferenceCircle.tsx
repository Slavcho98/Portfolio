import { Box, SxProps, Theme } from "@mui/material";

type Props = {
  sx?: SxProps<Theme>;
  innerSx?: SxProps<Theme>;
};

function ConferenceCircle({ sx, innerSx }: Props) {
  return (
    <Box
      sx={{
        position: "absolute",
        border: "1px solid #3C636A",
        left: { xs: "none", md: "25%" },
        right: { xs: "0" },
        top: 0,
        width: { xs: "100px", md: "180px" },
        height: { xs: "100px", md: "180px" },
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: { xs: "60px", md: "100px" },
          height: { xs: "60px", md: "100px" },
          borderRadius: "50%",
          overflow: "hidden",
          backgroundImage: 'url("/img/president.jpg")',
          backgroundSize: "160%",
          backgroundPosition: "20px right",
          backgroundRepeat: "no-repeat",
          border: "1px solid black",
          ...innerSx,
        }}
      />
    </Box>
  );
}

export default ConferenceCircle;
