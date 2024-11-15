import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

import { IoIosArrowUp } from "react-icons/io";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fade from "@mui/material/Fade";

interface Props {
  window?: () => Window;
}

function ScrollToTopButton({ window }: Props) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 20,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", zIndex: "999999", bottom: 16, right: 16 }}
      >
        <Fab
          size="small"
          aria-label="scroll back to top"
          sx={{ backgroundColor: "#fff" }}
        >
          <IoIosArrowUp size={20} color="#E87B22" />
        </Fab>
      </Box>
    </Fade>
  );
}

export default ScrollToTopButton;
