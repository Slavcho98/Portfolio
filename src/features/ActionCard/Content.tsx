import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

type EventItem = {
  title?: string;
  subtitle?: string;
};

const Content = ({ event, isHovered }: { event?: EventItem; isHovered: boolean }) => (
  <Box
    sx={{
      width: isHovered ? "100%" : "60%",
      p: "2rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "width 0.5s ease",
      position: "absolute",
      right: 0,
      zIndex: 0,
    }}
  >
    <Box>
      <Typography
        variant="h6"
        fontWeight="600"
        sx={{
          fontSize: "1em",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {event?.title}
      </Typography>
      <motion.div
        initial={{ x: "250%" }}
        animate={{
          x: isHovered ? 0 : "100%",
          opacity: isHovered ? 1 : 0,
          width: isHovered ? "38vw" : "",
        }}
        transition={{ duration: 0.7 }}
      >
        <Typography
          variant="caption"
          fontWeight="400"
          fontSize=".8em"
          sx={{
            overflowWrap: isHovered ? "break-word" : "",
          }}
        >
          {event?.subtitle}
        </Typography>
      </motion.div>
    </Box>
  </Box>
);

export default Content;
