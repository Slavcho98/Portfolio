import { Box, SxProps, Theme } from "@mui/material";
import SocialMedia from "../../ui/SocialMedia";
import { ReactNode } from "react";

type Props = {
  sx?: SxProps<Theme>;
  children?: ReactNode
};

function BlogHero({ sx = {}, children }: Props) {
  return (
    <Box sx={{ position: "relative", pb: 3, pt: 8 }}>
      <img
        src="/img/horizontal-dot3.png"
        style={{ position: "absolute", maxWidth: "100%", bottom: 0 }}
      />
      <Box sx={{ pt: 2, position: "relative" }}>
        <Box
          sx={{
            position: "relative",
            width: "95%",
            mx: "auto",
            borderRadius: "25vw",
            minHeight: "85dvh",
            backgroundImage: 'url("./public/img/Blog.png")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top",
            display: "flex",
            alignItems: "flex-end",

            ...sx,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              color: "#fff",
              top: "50%",
              left: "10%",
              transform: "translate(-10%, -50%)",
            }}
          >
           {children}
          </Box>
        </Box>
        <SocialMedia sx={{ bottom: 0 }}>
          Заследи не на социјалните медиуми
        </SocialMedia>
      </Box>
    </Box>
  );
}

export default BlogHero;
