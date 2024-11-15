import React from "react";
import { Box, Typography } from "@mui/material";
import { IoMdTime } from "react-icons/io";
import Logo from "../../ui/Logo";
import { NavLink } from "react-router-dom";

interface CalendarEventItemProps {
  title: string;
  duration: string;
  description: string;
}

interface CalendarProps {
  item: CalendarEventItemProps;
}

const CalendarEventItem: React.FC<CalendarProps> = ({ item }) => {
  const { title, duration, description } = item;
  return (
    <Box>
      <Box sx={{ pb: 5 }}>
        <Box sx={{ pb: 2 }}>
          <Logo sx={{ width: 35 }} />
          <Typography variant="caption">МАЧР</Typography>
        </Box>

        <Typography variant="h6">{title}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pt: 2,
            pb: 5,
            color: "#21383E99",
          }}
        >
          <IoMdTime style={{ fontSize: "1.3em", marginRight: "0.2em" }} />
          <Typography variant="caption" sx={{ fontSize: ".9em" }}>
            {duration}
          </Typography>
        </Box>

        <Typography variant="caption">{description}</Typography>
      </Box>
      <NavLink to="/" style={{ fontSize: ".8em", color: "#E87B22" }}>
        Прочитај повеќе
      </NavLink>
    </Box>
  );
};

export default CalendarEventItem;
