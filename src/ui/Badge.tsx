import { Box, SxProps, Theme, Typography } from "@mui/material";

type Props = {
  title?: string;
  subtitle?: string;
  sx?: SxProps<Theme>;
  reverse?: boolean;
};

function Badge({ title, subtitle, sx, reverse }: Props) {
  return (
    <Box
      sx={{
        position: "absolute",
        right: reverse ? "auto" : "10%",
        left: reverse ? "10%" : "auto",
        transform: "translate(50%)",
        p: 1,
        width: "200px",
        borderRadius: "50vw",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 30px 80px 0px #2F415833",
        zIndex: 3,
        backgroundColor: "white",
        flexDirection: reverse ? "row-reverse" : "row",
        ...sx,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "50px",
          height: "50px",
          border: "1px solid red",
          borderRadius: "50%",
          backgroundColor: "#E87B22",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
          zIndex: 4,
        }}
      >
        <img
          src="/img/Vector.png"
          style={{ width: "25px" }}
          alt="Badge Icon"
        />
      </Box>
      <Box sx={{ pl: reverse ? "0" : "1rem", pr: reverse ? "1rem" : "0" }}>
        <Typography
          variant="caption"
          display="block"
          sx={{ pb: ".3rem", color: "#0F294A", fontWeight: "600" }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: "block", fontSize: ".6em" }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default Badge;
