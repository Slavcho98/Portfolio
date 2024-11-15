import { Box, useMediaQuery, useTheme } from "@mui/material";
// import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChildrenProps } from "../types/type";

type Props = {
  image1: string;
  image2: string;

};

function Banner({ image1, image2, children }: Props & ChildrenProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <motion.div
        style={{
          backgroundImage: `url(${image1})`,
          backgroundSize: isSmallScreen ? "200%" : "cover",
          backgroundPosition: isSmallScreen ? "left" : "center",
          borderRadius: "0 0 50vw 50vw",
          width: isSmallScreen ? "100%" : "30%",
          height: "70vh",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {children}

      {!isSmallScreen && (
        <motion.img
          src={image2}
          alt="Second Image"
          style={{
            width: "50%",
            position: "absolute",
            top: 0,
            right: 0,
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      )}
    </Box>
  );
}

export default Banner;
