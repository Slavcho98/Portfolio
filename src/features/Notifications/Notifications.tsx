import { useState } from "react";
import { IconButton, Box, Collapse, Typography, Divider } from "@mui/material";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationsList from "./NotificationsList";
import { useCalendar } from "../../hooks/useCalendar";

function Notifications() {
  const [open, setOpen] = useState(false);
  const { eventsSchedule } = useCalendar();

  const toggleNotifications = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        color="inherit"
        sx={{ width: 40, height: 40 }}
        onClick={toggleNotifications}
      >
        <IoIosNotificationsOutline />
      </IconButton>

      <Box sx={{ position: "absolute", left: "50%", top: 65, transform: "translate(-50%)" }}>
        <Collapse in={open}>
          <Box
            sx={{
              bgcolor: "white",
              boxShadow: 2,
              borderRadius: 1,
         
              zIndex: 10,
              width: 270,
              maxHeight: 400, 
              overflowY: "auto", 
              
              "&::-webkit-scrollbar": {
                width: "6px",
          
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888", 
                borderRadius: "10px", 
                height: "10px"
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555", 
              },
            }}
          >
            <Typography variant="h6" py={1} textAlign="center">Нотификации</Typography>
            <Divider />

            {eventsSchedule?.map((event) => (
              <NotificationsList event={event} key={event.id} />
            ))}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}

export default Notifications;
