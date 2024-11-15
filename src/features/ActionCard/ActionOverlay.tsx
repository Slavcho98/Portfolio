import { motion } from "framer-motion";

const ActionOverlay = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div
    initial={{ opacity: 1, scale: 1 }}
    animate={{
      opacity: isHovered ? 0.8 : 1,
      scale: isHovered ? 0.1 : 1,
      display: isHovered ? "none" : "block",
    }}
    transition={{ duration: 0.8 }}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "40%",
      height: "100%",
      backgroundColor: isHovered ? "rgba(17, 32, 68, 1)" : "transparent",
      borderRadius: "0 0 0 250px",
      zIndex: 2,
      originX: 0,
      originY: 0,
    }}
  />
);

export default ActionOverlay;
