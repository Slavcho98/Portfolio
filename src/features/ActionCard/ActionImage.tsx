import { motion } from "framer-motion";

const ActionImage = ({
  image,
  isHovered,
}: {
  image?: string;
  isHovered: boolean;
}) => (
  <motion.div
    initial={{ opacity: 1, scale: 1 }}
    animate={{
      opacity: isHovered ? 0 : 1,
      scale: isHovered ? 0.1 : 1,
    }}
    transition={{ duration: 0.8 }}
    style={{
      backgroundImage: `url('${image}')`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      borderRadius: "0 0 0 140px",
      width: "40%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1,
      originX: 0,
      originY: 0,
    }}
  />
);

export default ActionImage;
