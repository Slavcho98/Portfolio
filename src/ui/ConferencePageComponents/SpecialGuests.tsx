import { Box } from "@mui/material";
import EventCard from "../EventCard";
import Badge from "../Badge";
import { SpecialGuestsProps } from "../../types/type";

function SpecialGuests({ data, badgeStyle, eventSx, sx }: SpecialGuestsProps) {
  const { name, position, image } = data;
  const { sx: badgeSx, reverse } = badgeStyle;

  return (
    <Box width={1 / 2} sx={{ position: "relative", ...sx }}>
      <EventCard
        sx={{
          width: "70%",
          minHeight: "60vh",
          borderRadius: "50vw 50vw 0 0",
          backgroundImage: `url(${image})`,
          backgroundPosition: "top",
          ...eventSx,
        }}
      />
      <Badge title={name} subtitle={position} reverse={reverse} sx={badgeSx} />
    </Box>
  );
}

export default SpecialGuests;
