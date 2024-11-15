import { Box, Typography } from "@mui/material";
import { SignUpPageImages as images } from "../types/imagesTypes";
import CustomButton from "../ui/CustomButton";
import HeroSection from "../ui/HeroSection";
import Banner from "../ui/Banner";
import HeroBlog from "../ui/HeroBlog";
import Register from "../ui/SignupPageComponents/Register";
import MemberBenefits from "../ui/SignupPageComponents/MemberBenefits";

export default function SignUpPage() {
  return (
    <>
      <HeroSection>
        <Banner image1={images.signUpPageImg1} image2={images.signUpPageImg2}>
          <Box>
            <HeroBlog
              sx={{ width: "50%", top: "45%", transform: "translate(0, -50%)" }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1em", lg: "2.6em" },
                  py: "0.5rem",
                  lineHeight: "1.3em",
                }}
              >
                Придружи ни се
              </Typography>
            </HeroBlog>
            <Box
              sx={{
                width: "40%",
                backgroundColor: "#fff",
                p: 2,
                mt: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transform: "translate(-50%)",
                position: "absolute",
                left: "32%",
                top: "35%",
                zIndex: 999,
                borderRadius: "50vw",
                boxShadow: "0px 30px 80px 0px #2F415833",
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                Сакаш да се информираш подетално за бенефитите?
              </Typography>
            </Box>
            <CustomButton
              style={{
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, -50%)",
                top: "67%",
                zIndex: 9999,
              }}
            >
              Прочитај повеќе
            </CustomButton>
          </Box>
        </Banner>
      </HeroSection>
      <Register />
      <MemberBenefits />
    </>
  );
}
