import { Box, Grid } from "@mui/material";
import BadgePoints from "./BadgePoints";
import NewestBadges from "./NewestBadges";
import ConnectionsList from "./ConnectionsList";
import TicketsBought from "./TicketsBought";
import Sale from "./Sale";
import CommentSection from "../../features/CommentsAndReplies/CommentSection";


export default function Dashboard() {
  return (
    <Box sx={{ width: "85%", mx: "auto", pt: "5rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <BadgePoints />
          <NewestBadges />
          <ConnectionsList />
        </Grid>
        <Grid item xs={6} md={8}>
          <TicketsBought />
          <Sale />
          <CommentSection sx={{ my: 0, width: 1, ml: 2 }} />
        </Grid>
      </Grid>
    </Box>
  );
}
