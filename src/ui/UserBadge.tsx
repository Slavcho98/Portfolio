import { Box, Stack, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  sx?: SxProps<Theme>;
  children?: ReactNode;
  showImage?: boolean;
};

export default function UserBadge({ sx, children, showImage = false }: Props) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: "60px",
          height: "60px",
          borderRadius: "0 0 50vw 50vw",
          overflow: "hidden",
          backgroundImage: 'url("/img/darko.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          ...sx,
        }}
      >
        {showImage && (
          <img
            src="/img/ticket.png"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "80px",
              height: "auto",
              zIndex: 1,
            }}
            alt="Ticket"
          />
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          p: 1,
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}
