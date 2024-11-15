import Box from "@mui/material/Box";
import ProfileInfo from "./ProfileInfo";
import Biography from "./Biography";
import Recommendations from "./Recommendations";

export default function Profile() {
  return (
    <Box sx={{ width: "85%", mx: "auto", my: 10 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 4">
          <ProfileInfo />
        </Box>
        <Box gridColumn="span 8">
          <Biography />
          <Recommendations/>
        </Box>
      </Box>
    </Box>
  );
}
