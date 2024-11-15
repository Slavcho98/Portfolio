import {  Typography } from "@mui/material";
import HeroBlog from "../HeroBlog";
import CustomButton from "../../ui/CustomButton";

const defaultStyles = {
  position: "absolute",
  left: "10%",
  top: "40%",
  zIndex: "999",
  backgroundColor: "#fff",
  p: "2rem",
  width: "80%",
  borderRadius: "10px",
  boxShadow: "0px 30px 80px 0px #2F415833",
};

const HeroSection = () => (
  <HeroBlog sx={{ ...defaultStyles }}>
    <Typography variant="body1">Упати се уште сега кон</Typography>
    <CustomButton
      style={{
        position: "absolute",
        right: "20%",
        top: "25%",
        transform: "translate(50%, 0)",
      }}
    >
      Нашиот блог
    </CustomButton>
  </HeroBlog>
);

export default HeroSection;
