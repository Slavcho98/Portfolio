import { Box, Stack, Typography } from "@mui/material";
import { EventTypes } from "../../types/type";

interface NotificationsListProps {
  event: EventTypes;
}

function NotificationsList({ event }: NotificationsListProps) {
  return (
    <Stack p={1} sx={{borderBottom: "1px solid #EBF4F6", cursor: "pointer",

      "&:hover": {
        backgroundColor: "#F5F5F5",
      },
    }} >
      <Typography variant="body2" fontWeight={600}>
        Додаден нов настан
      </Typography>
      <Box sx={{pt: "0.2em"}}>
        <Typography>
          <span style={{ color: "red", paddingRight: 5 }}>|</span>
          {event.title}
        </Typography>
        <Typography variant="caption" color="#E87B22" fontWeight={600}>{event.events}</Typography>{" "}
      
      </Box>
    </Stack>
  );
}

export default NotificationsList;
