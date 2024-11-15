import { motion } from "framer-motion";
import { CSSProperties, ReactNode, useState, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disableHover?: boolean;
  disabled?: boolean;
  show?: boolean;
};

function CustomButton({
  children,
  style,
  type = "button",
  onClick,
  disableHover = false,
  disabled = false,
  show = true,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [wasHovered, setWasHovered] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(140);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (isHovered) {
      setWasHovered(true);
    }
  }, [isHovered]);

  if (!show) {
    return null;
  }

  return (
    <motion.button
      ref={buttonRef}
      animate={{
        width:
          disableHover || disabled
            ? buttonWidth
            : isHovered
            ? [buttonWidth, buttonWidth + 20, buttonWidth]
            : wasHovered
            ? [buttonWidth + 1, buttonWidth + 20, buttonWidth]
            : buttonWidth,
        backgroundColor:
          isHovered && !disableHover && !disabled
            ? "#fff"
            : disabled
            ? "#b3b3b3"
            : "#E87B22",
        color: isHovered && !disableHover && !disabled ? "#0f294a" : "#fff",
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      onMouseEnter={() => !disableHover && !disabled && setIsHovered(true)}
      onMouseLeave={() => !disableHover && !disabled && setIsHovered(false)}
      onClick={!disabled ? onClick : undefined}
      type={type}
      disabled={disabled}
      style={{
        fontWeight: 600,
        whiteSpace: "nowrap",
        backgroundColor: disabled ? "#b3b3b3" : "#E87B22",
        color: "#fff",
        boxShadow: disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "12px 0",
        borderRadius: "50vw",
        border: "2px solid #E87B22",
        outline: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        minWidth: "140px",
        opacity: disabled ? 0.6 : 1,
        ...style,
        willChange: "transform, background-color, color",
      }}
    >
      {children}
    </motion.button>
  );
}

export default CustomButton;
