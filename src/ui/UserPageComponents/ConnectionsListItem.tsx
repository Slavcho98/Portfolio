// ConnectionsListItem.tsx
import { Box, Typography } from "@mui/material";
import EventCard from "../EventCard";
import { ConnectionsListItemProps } from "../../types/type";

const ConnectionsListItem: React.FC<ConnectionsListItemProps> = ({
  friend,
}) => {
  return (
    <Box sx={{ textAlign: "center", mb: 2 }}>
      <EventCard
        sx={{
          minWidth: 90,
          borderRadius: "10vw 10vw 0 0",
          minHeight: "15vh",
          mb: 0.5,
          backgroundImage: `url(${friend.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Typography variant="caption">{friend.firstName}</Typography>
    </Box>
  );
};

export default ConnectionsListItem;
