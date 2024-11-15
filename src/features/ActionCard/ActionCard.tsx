import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ActionImage from "./ActionImage";
import ActionOverlay from "./ActionOverlay";
import Content from "./Content";

type EventItem = {
  image?: string;
  title?: string;
  subtitle?: string;
  theme?: string;
};

type ActionAreaCardProps = {
  width?: string;
  event?: EventItem;
};

const ActionCard = ({ width = "70%", event }: ActionAreaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        minWidth: width,
        height: "35dvh",
        display: "flex",
        borderRadius: "0 0 140px 140px",
        boxShadow:
          "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ActionImage image={event?.image} isHovered={isHovered} />
      <ActionOverlay isHovered={isHovered} />
      <Content event={event} isHovered={isHovered} />

      <motion.div
        animate={{
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          left: "50%",
          top: "70%",
          transform: "translateX(-50%) translateY(-70%)",
        }}
      >
        <Link
          to="/blog"
          style={{
            fontSize: ".8em",
            color: "#E87B22",
          }}
        >
          Прочитај повеќе
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ActionCard;
