import React from "react";
import { Alert, Box } from "@mui/material";
import CalendarEventItem from "./CalendarEventItem";
import { useCalendar } from "../../hooks/useCalendar";
import dayjs, { Dayjs } from "dayjs";
import Spinner from "../../ui/Spinner";

interface CalendarEventsListProps {
  selectedDate: Dayjs;
}

const CalendarEventsList: React.FC<CalendarEventsListProps> = ({
  selectedDate,
}) => {
  const { isLoading, error, eventsSchedule } = useCalendar();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert variant="filled" severity="error" sx={{ fontSize: ".7em" }}>
        Настана грешка при вчитувањето настани.
      </Alert>
    );
  }

  const eventsForSelectedDate = eventsSchedule?.filter((event) =>
    dayjs(event.events).isSame(selectedDate, "day")
  );

  if (eventsForSelectedDate?.length === 0) {
    return (
      <Alert variant="filled" severity="info" sx={{ fontSize: ".7em" }}>
        Нема настани за избраниот датум
      </Alert>
    );
  }

  return (
    <Box>
      {eventsForSelectedDate?.map((item) => (
        <CalendarEventItem item={item} key={item.id} />
      ))}
    </Box>
  );
};

export default CalendarEventsList;
