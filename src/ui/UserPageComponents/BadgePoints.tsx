import { Box, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";

export default function BadgePoints() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });

  const circles = [1, 2, 3];
  const colors = ["#AAE4E4", "#E87B22", "#AE8E51"];

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        p: 2,
        borderRadius: "20px",
        boxShadow: "0px 9px 80px 0px #2F41581F",
      }}
      ref={ref}
    >
      <Typography variant="h6" textAlign="center">
        Поени до следна рамка
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          padding: "16px",
        }}
      >
        {circles.map((_, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              overflow: "hidden",
              border: "solid 1px #F6F6F6",
              backgroundColor: "#F6F6F6",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: inView
                  ? `conic-gradient(${colors[index]} 0%, ${colors[index]} 50%, transparent 50%, transparent 100%)`
                  : "conic-gradient(transparent 0%, transparent 100%)",
                borderRadius: "50%",
                transformOrigin: "center",
                transition: "background 1s linear",
                animation: inView
                  ? "halfCircleAnimation 1.2s linear forwards"
                  : "none",
              }}
            ></Box>
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "70px",
                height: "70px",
                overflow: "hidden",
                background: "white",
                border: `1px solid #F6F6F6`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "translate(-50%, -50%)", 
                borderRadius: "50%",
              }}
            >
              <Box
                sx={{
                  borderRadius: "0 0 10vw 10vw",
                  border: `4px solid ${colors[index]}`,
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1em",
                    fontWeight: "bold",
                    color: colors[index],
                  }}
                >
                  50
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <style>
          {`
            @keyframes halfCircleAnimation {
              0% { transform: rotate(-180deg); }
              100% { transform: rotate(0deg); }
            }
          `}
        </style>
      </Box>
    </Box>
  );
}
