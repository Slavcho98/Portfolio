import { Box, SxProps, Theme } from "@mui/material";

type Background2Props = {
  sx?: SxProps<Theme>;
};

function Background2({ sx }: Background2Props) {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: "-1",
        backgroundImage: 'url("./public/img/whiteElement.png")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "25vh",
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
    >
     
    </Box>
  );
}

export default Background2;
