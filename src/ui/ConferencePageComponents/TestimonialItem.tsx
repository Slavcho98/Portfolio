import { Box, Typography, IconButton, Stack } from "@mui/material";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { TestimonialItemProps } from "../../types/type";

const TestimonialItem: React.FC<TestimonialItemProps> = ({
  testimonial,
  index,
  currentIndex,
  totalCount,
  handleNext,
  handlePrev,
}) => {
  return (
    <Box
      sx={{
        flex: "0 0 100%",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box sx={{ width: "30%" }}>
        <Box
          sx={{
            width: 440,
            height: 440,
            border: 1,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              backgroundImage: `url('${testimonial.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              width: 230,
              height: 230,
              borderRadius: "50%",
            }}
          />
          <Box
            component="img"
            src="/img/commas.png"
            alt="Commas Image"
            sx={{
              position: "absolute",
              top: 80,

              left: 100,
              width: 80,
            }}
          />
          <Box
            component="img"
            src="/img/Pattern.png"
            alt="Commas Image"
            sx={{
              position: "absolute",
              top: "40%",
              transform: "translate(-50%)",
              zIndex: 9999,
              left: 100,
              width: 80,
            }}
          />
        </Box>

      </Box>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: currentIndex === index ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "70%",
          position: "absolute",
          left: 350,
        }}
      >
        <Typography variant="h4" sx={{ color: "#E87B22", mb: 1 }}>
          {testimonial.name}
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mb: 2 }}>
          {testimonial.title}
        </Typography>
        <Typography variant="caption">{testimonial.description}</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ pt: 2 }}>
          <IconButton onClick={handlePrev} sx={{ p: 0, cursor: "pointer" }}>
            <IoIosArrowBack size={15} />
          </IconButton>
          <Typography variant="caption">
            {currentIndex + 1} / {totalCount}
          </Typography>
          <IconButton onClick={handleNext} sx={{ p: 0, cursor: "pointer" }}>
            <IoIosArrowForward size={15} />
          </IconButton>
        </Stack>
      </motion.div>
    </Box>
  );
};

export default TestimonialItem;
