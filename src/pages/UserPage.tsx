import { Box } from "@mui/material";
import CalendarSection from "../features/Calendar/CalendarSection";
import EventsCarousel from "../ui/EventsCarousel";
import Dashboard from "../ui/UserPageComponents/Dashboard";
import Profile from "../ui/UserPageComponents/Profile";

 function User() {
  return (
    <Box sx={{minHeight: "100dvh", pt: 8}}>
      <Profile />
      
      <EventsCarousel />
      <Dashboard />
      <CalendarSection />
    </Box>
  );
}
export default User;