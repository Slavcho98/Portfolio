import { Box, Typography } from "@mui/material";

import EventCard from "../EventCard";
import ActionCard from "../../features/ActionCard/ActionCard";
import Jobs from "./Jobs";

import { useBlogs } from "../../hooks/useBlogs";

export default function NewestBlogs() {
  const { blogsData } = useBlogs();
  const firstBlogItem = blogsData?.[0];
  const secondBlogItem = blogsData?.[1];

  return (
    <Box sx={{ width: "85%", display: "flex", gap: 2, mx: "auto", pt: "5rem" }}>
      <Box sx={{ width: "80%" }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          {firstBlogItem && <ActionCard width="65%" event={secondBlogItem} />}
          <EventCard showOverlay>
            <Typography variant="h6" sx={{ mb: ".7rem", fontSize: "1em" }}>
              HR кафе <br />
              Развој на Кариерата
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "2rem" }}>
              Јули
            </Typography>
            <Box
              sx={{
                width: "80px",
                borderRadius: "10px",
                mx: "auto",
                border: "4px solid #fff",
              }}
            >
              <Typography variant="button" sx={{ fontSize: "2.5rem" }}>
                25
              </Typography>
            </Box>
          </EventCard>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <EventCard showOverlay>
            <Typography variant="h6" sx={{ mb: ".7rem", fontSize: "1em" }}>
              HR кафе <br />
              Развој на Кариерата
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "2rem" }}>
              Јули
            </Typography>
            <Box
              sx={{
                width: "80px",
                borderRadius: "10px",
                mx: "auto",
                border: "4px solid #fff",
              }}
            >
              <Typography variant="button" sx={{ fontSize: "2.5rem" }}>
                25
              </Typography>
            </Box>
          </EventCard>
          {firstBlogItem && <ActionCard width="65%" event={firstBlogItem} />}
        </Box>
      </Box>
      <Jobs />
    </Box>
  );
}
