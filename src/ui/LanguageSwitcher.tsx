import React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

type Props = {
  sx?: SxProps<Theme>
}

const LanguageSwitcher: React.FC<Props> = ({sx}) => {
  return (
    <IconButton
      sx={{
        display: { xs: "none", sm: "none", md: "block" },

        width: 50,
        height: 50,
        "&:hover": {
          backgroundColor: "transparent",
        },
        ...sx
      }}
    >
      <Typography variant="caption" color="#0E2040">
        EN/MK
      </Typography>
    </IconButton>
  );
};

export default LanguageSwitcher;
