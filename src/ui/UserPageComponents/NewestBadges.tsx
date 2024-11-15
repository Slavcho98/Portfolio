import { Box, Stack, Typography } from "@mui/material";
import { BiMessageRounded } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";

export default function NewestBadges() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        p: 2,
        borderRadius: "20px",
        boxShadow: "0px 9px 80px 0px #2F41581F",
        my: 5,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Најнови беџови</Typography>
        <Typography variant="caption">Види ги сите</Typography>
      </Stack>

      <Stack>
        <Box sx={{ border: 1, p: 1.5, borderRadius: "10px", my: 3 }}>
          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                backgroundColor: "#D2B830",
                width: "60px",
                height: "50px",
                borderRadius: "0 0 10vw 10vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <BiMessageRounded size={30} color="#fff" />
            </Box>
            <Typography variant="caption">
              Левел 3 беџ за редовно посетување на настани
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ border: 1, p: 1.5, borderRadius: "10px" }}>
          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                backgroundColor: "#D23030",
                width: "60px",
                height: "50px",
                borderRadius: "0 0 10vw 10vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CiCalendar color="#fff" size={30} />
            </Box>
            <Typography variant="caption">
              Левел 3 беџ за редовно посетување на настани
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
