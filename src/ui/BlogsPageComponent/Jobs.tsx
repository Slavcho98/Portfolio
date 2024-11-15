import React from "react";
import { Stack, Typography, IconButton, Box } from "@mui/material";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import { useQuery } from "@tanstack/react-query";
import EventCard from "../EventCard";
import { getJobs } from "../../services/apiEvents";
import { Job } from "../../types/type";

function Jobs() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -100, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };

  const {
    isLoading,
    data: jobs,
    error,
  } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: getJobs,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Error loading jobs
      </Box>
    );

  return (
    <EventCard
      showOverlay
      position="start"
      sx={{ py: 3, backgroundImage: "url('/img/jobs.jpg')" }}
    >
      <Typography variant="h5">Најнови огласи</Typography>
      <Box sx={{ position: "relative", pt: 2 }}>
        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: "50%",
            transform: "translateX(50%)",
            zIndex: 1,
            color: "#fff",
          }}
          onClick={scrollUp}
        >
          <IoIosArrowUp />
        </IconButton>
        <Box
          ref={scrollRef}
          sx={{
            mt: 5,
            maxHeight: "300px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Stack spacing={2.5} sx={{ pt: 2 }}>
            {jobs?.map((job, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={job.image}
                  alt={job.title}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "1rem",
                  }}
                />
                <Typography variant="h5" sx={{ fontSize: "1em" }}>
                  {job.title}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
        <IconButton
          sx={{
            position: "absolute",
            bottom: "-20%",
            right: "50%",
            transform: "translateX(50%)",
            zIndex: 1,
            color: "#fff",
          }}
          onClick={scrollDown}
        >
          <IoIosArrowDown />
        </IconButton>
      </Box>
    </EventCard>
  );
}

export default Jobs;
