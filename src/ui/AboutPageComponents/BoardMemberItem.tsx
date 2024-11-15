import {
  Box,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type BoardMemberItemProps = {
  board: {
    id: string;
    image: string;
    firstName: string;
    title: string;
  };
  sx?: SxProps<Theme>;
};

function BoardMemberItem({ board, sx }: BoardMemberItemProps) {
  return (
    <Box key={board.id} sx={{ width: 1, height: "55vh", ...sx }}>
      <Box
        sx={{
          width: "100%",
          height: "50vh",
          borderRadius: "0 0 50vw 50vw",
          backgroundColor: "#fff",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "20vh",
            mx: "auto",
            borderRadius: "0 0 50vw 50vw",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${board.image})`,
          }}
        />

        <Typography
          variant="subtitle1"
          sx={{
            color: "#E87B22",
            fontWeight: "500",
            textAlign: "center",
            mt: 2,
            fontSize: "0.9em",
          }}
        >
          {board.firstName}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            textAlign: "center",
            mt: 1,
            flexGrow: 1,
            fontSize: "0.7em",
          }}
        >
          {board.title}
        </Typography>

        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt: "auto", mb: 5 }}
        >
          <IconButton size="small" sx={{ fontSize: "1em", color: "#0F294A" }}>
            <FaFacebookSquare fontSize="inherit" />
          </IconButton>
          <IconButton size="small" sx={{ fontSize: "1em", color: "#0F294A" }}>
            <FaXTwitter fontSize="inherit" />
          </IconButton>
          <IconButton size="small" sx={{ fontSize: "1em", color: "#0F294A" }}>
            <FaInstagram fontSize="inherit" />
          </IconButton>
          <IconButton size="small" sx={{ fontSize: "1em", color: "#0F294A" }}>
            <FaLinkedin fontSize="inherit" />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}

export default BoardMemberItem;
