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

const speakers = [
  {
    imageUrl: "./public/img/speaker1.jpg",
    name: "Елица Перчинкова",
    title: "АЕК",
  },
  {
    imageUrl: "./public/img/speaker2.jpg",
    name: "Зорица Поповска",
    title: "Сенсум коучинг и тренинг центар",
  },
  {
    imageUrl: "./public/img/speaker3.jpg",
    name: "Марија Петрушевска",
    title: "ТТК банка",
  },
];

type Props = {
  sx?: SxProps<Theme>;
};

export default function EventSpeakersItem({ sx }: Props) {
  return (
    <>
      {speakers.map((speaker, index) => (
        <Box key={index} sx={{ width: "33.333%", height: "55vh", ...sx }}>
          <Box
            sx={{
              height: "100%",
              borderRadius: "0 0 10vw 10vw",
              backgroundColor: "#fff",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              mr: "1rem",
              px: 1,
            }}
          >
            <Box
              sx={{
                width: "80%",
                height: "22vh",
                mx: "auto",
                borderRadius: "0 0 10vw 10vw",
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundImage: `url(${speaker.imageUrl})`,
              }}
            />
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              sx={{ height: "20vh", mt: 2 }}
              textAlign="center"
            >
              <Typography variant="subtitle1">{speaker.name}</Typography>
              <Typography variant="caption">{speaker.title}</Typography>
              <Stack direction="row" sx={{ mt: 1 }}>
                <IconButton sx={{ fontSize: 15 }}>
                  <FaFacebookSquare />
                </IconButton>
                <IconButton sx={{ fontSize: 15 }}>
                  <FaXTwitter />
                </IconButton>
                <IconButton sx={{ fontSize: 15 }}>
                  <FaInstagram />
                </IconButton>
                <IconButton sx={{ fontSize: 15 }}>
                  <FaLinkedin />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Box>
      ))}
    </>
  );
}
