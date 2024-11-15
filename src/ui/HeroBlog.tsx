import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import { SxProps, Theme } from "@mui/material/styles";


type Props = {
  sx?: SxProps<Theme>;
  children: ReactNode;
};

const defaultStyles: SxProps<Theme> = {
  position: "absolute",
  left: {xs: 0, sm: "0", md: "10%"},
  zIndex: 999,
  backgroundColor: "#fff",
  p: "1.5rem",
  display: "inline-flex",
  flexDirection: "column",
  maxWidth: "100%",
  borderRadius: "10px",
  boxShadow: "0px 30px 80px 0px #2F415833",

};

const HeroBlog: FC<Props> = ({ children, sx }) => {
  return (
    <Box
      sx={{

        ...defaultStyles,
        ...sx,
      }}
    >
      
      {children}
      
    </Box>
  );
};

export default HeroBlog;
