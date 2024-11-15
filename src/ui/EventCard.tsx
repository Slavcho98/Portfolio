import { Box, Card, CardContent, SxProps, Theme } from "@mui/material";
import { ReactNode, useState, useEffect } from "react";

type Props = {
  children?: ReactNode;
  type?: string;
  position?: string;
  width?: string;
  ml?: string;
  mb?: string;
  borderRadius?: string;
  sx?: SxProps<Theme>;
  showOverlay?: boolean;
};

function EventCard({
  children,
  position = "center",
  sx = {},
  showOverlay = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/img/event_img1.jpg";
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "0 0 50vw 50vw",
        minWidth: "240px",
        minHeight: "40dvh",
        backgroundColor: "transparent",
        mb: "2rem",
        ml: 0,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: position,
        backgroundImage: "url('./public/img/carousel2.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        filter: loaded ? "none" : "blur(10px)",
        transition: "filter 0.3s ease-in-out",
        ...sx,
      }}
    >
      {showOverlay && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.68)",
            zIndex: 1,
          }}
        />
      )}
      <CardContent
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}

export default EventCard;
