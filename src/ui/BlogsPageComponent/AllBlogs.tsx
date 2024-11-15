import { Box, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ErrorDisplay from "../ErrorDisplay";
import ActionCard from "../../features/ActionCard/ActionCard";
import Spinner from "../Spinner";
import { useSearchParams } from "react-router-dom";
import { useBlogs } from "../../hooks/useBlogs";
import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";

function AllBlogs() {
  const { isPending, error, blogsData } = useBlogs();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("category") || "Сите";

  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter the blogs based on the selected filter
  const filteredBlogs = (blogsData || [])
    .filter((agenda) => {
      if (filterValue === "регрутирање") return agenda.tag === "recruitment";
      if (filterValue === "компензации") return agenda.tag === "compensation";
      if (filterValue === "hr-согласност") return agenda.tag === "consent";
      return true;
    })
    .sort((a, b) => a.id - b.id);

  const itemsPerPage = 4;

  useEffect(() => {
    setCurrentIndex(0);
  }, [filterValue, filteredBlogs.length]);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < filteredBlogs.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + itemsPerPage >= filteredBlogs.length;

  if (isPending) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        onClick={handleNext}
        disabled={isNextDisabled}
        sx={{
          position: "absolute",
          mr: 2,
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
        }}
      >
        <IoIosArrowForward size={60} />
      </IconButton>
      <IconButton
        onClick={handlePrev}
        disabled={isPrevDisabled}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          ml: 2,
          transform: "translateY(-50%)",
        }}
      >
        <IoIosArrowBack size={60} />
      </IconButton>
      <ErrorDisplay error={error} />
      <Box sx={{ width: "85%", mx: "auto", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={3} sx={{ position: "relative", pt: 15 }}>
            {filteredBlogs
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((event) => (
                <Grid size={6} key={event.id}>
                  <Typography
                    variant="h4"
                    sx={{ position: "absolute", top: 0, pt: 5 }}
                  >
                    {event.theme}
                  </Typography>
                  <ActionCard event={event} />
                </Grid>
              ))}
          </Grid>
        </motion.div>
      </Box>
    </Box>
  );
}

export default AllBlogs;
