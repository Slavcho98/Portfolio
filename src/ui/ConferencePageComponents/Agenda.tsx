import { Box, Typography } from "@mui/material";
import { AgendaActivitesProps } from "../../types/type";

export default function Agenda({ data }: AgendaActivitesProps) {
  const {
    time,
    session,
    description_1,
    description_2,
    description_3,
    name: speakerName,
  } = data;

  const formattedTime = time ? time.slice(0, 5) : "";

  return (
    <Box sx={{ display: "flex", pb: 2.5 }}>
      <Box>
        <Typography variant="body1">{formattedTime}</Typography>
      </Box>
      <Box sx={{ pl: 4 }}>
        <Typography variant="h6" fontSize="1.1em" fontWeight={600}>
          <span style={{ color: "#E87B22" }}>|</span> {session}
        </Typography>
        {description_1 && (
          <Typography component="li" variant="body1" sx={{ pl: 1.5 }}>
            {description_1}{" "}
            <Typography
              component="span"
              sx={{ color: "#E87B22", fontWeight: 600 }}
            >
              {speakerName}
            </Typography>
          </Typography>
        )}
        {description_2 && (
          <Typography component="li" variant="body1" sx={{ pl: 1.5 }}>
            {description_2}
          </Typography>
        )}

        {description_3 && (
          <Typography component="li" variant="body1" sx={{ pl: 1.5 }}>
            {description_3}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
