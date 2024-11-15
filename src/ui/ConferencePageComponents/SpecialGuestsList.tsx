import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getSpeakers } from "../../services/apiEvents";
import SpecialGuestsItem from "./SpecialGuests";
import CustomButton from "../../ui/CustomButton";

function SpecialGuestsList() {
  const {
    isLoading,
    data: speakers,
    error,
  } = useQuery({
    queryKey: ["speakers"],
    queryFn: getSpeakers,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Error loading events
      </Box>
    );

  const badgeStyles = [
    { sx: { bottom: "10%", right: "0", transform: "translate('-50%')" } },
    {
      sx: { top: "40%", left: 0, transform: "translate('-50%')" },
      reverse: true,
    },
    { sx: { top: "40%", right: 0, transform: "translate('-50%')" } },
    { sx: { top: "5%", left: 0, transform: "translate('-50%')" } },
  ];

  const eventStyles = [
    {},
    {},
    { borderRadius: "0 0 50vw 50vw" },
    { borderRadius: "0 0 50vw 50vw" },
  ];

  return (
    <Box sx={{ width: "85%", mx: "auto", py: 10 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight={600} sx={{ pb: 3 }}>
          Специјални гости
        </Typography>
        <Typography variant="body1">
          Ова се луѓе од кои дефинитивно има што да се научи. Нивните
          достигнувања се огромни и со нивна помош секторот на HR успеа да
          достигне нови височини. Не пропуштајте ја оваа прилика да ка слушнете,
          а и да научите нешто од нивната мудрост.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          py: 8,
          position: "relative",
        }}
      >
        {speakers?.map((speaker, index) => (
          <SpecialGuestsItem
            key={speaker.id}
            data={speaker}
            badgeStyle={badgeStyles[index]}
            eventSx={eventStyles[index]}
            sx={
              index % 2 === 1
                ? {
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "relative",
                  }
                : {}
            }
          />
        ))}
        <CustomButton
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%)",
          }}
        >
          Сите спикери
        </CustomButton>
      </Box>
    </Box>
  );
}

export default SpecialGuestsList;
