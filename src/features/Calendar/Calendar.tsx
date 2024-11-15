import React, { useEffect, useState, useMemo } from "react";
import {
  DateCalendar,
  DayCalendarSkeleton,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Alert, Box } from "@mui/material";
import "dayjs/locale/mk";
import CalendarEventsList from "./CalendarEventsList";
import { useCalendar } from "../../hooks/useCalendar";
import ServerDay from "./ServerDay";
import { calendarStyles } from "./calendarStyles";
import CustomButton from "../../ui/CustomButton";

interface EventData {
  id: number;
  created_at: string;
  events: string;
  title: string;
  duration: string;
  description: string;
}

const Calendar: React.FC = () => {
  const { eventsSchedule } = useCalendar();
  const [highlightedDays, setHighlightedDays] = useState<Dayjs[]>([]);
  const [value, setValue] = useState<Dayjs | null>(null);

  const eventDays = useMemo(
    () =>
      eventsSchedule
        ? eventsSchedule.map((event: EventData) => dayjs(event.events))
        : [],
    [eventsSchedule]
  );

  useEffect(() => {
    if (JSON.stringify(eventDays) !== JSON.stringify(highlightedDays)) {
      setHighlightedDays(eventDays);
    }
  }, [eventDays, highlightedDays]);

  const handleDateChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const isEventDay = useMemo(
    () =>
      value &&
      eventDays.some((eventDay) => dayjs(eventDay).isSame(value, "day")),
    [value, eventDays]
  );

  return (
    <Box sx={calendarStyles.root}>
      <Box sx={calendarStyles.leftPane}>
        {value ? (
          <CalendarEventsList selectedDate={value} />
        ) : (
          <Alert variant="filled" severity="info" sx={{ fontSize: ".7em" }}>
            Нема настани за избраниот датум
          </Alert>
        )}
      </Box>
      <Box sx={calendarStyles.rightPane}>
        <Box sx={{ position: "relative" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={value}
              onChange={handleDateChange}
              renderLoading={() => <DayCalendarSkeleton />}
              slots={{ day: ServerDay }}
              slotProps={{ day: { highlightedDays } as any }}
              sx={calendarStyles.dayPicker}
            />
          </LocalizationProvider>

          {isEventDay ? (
            <CustomButton
              style={{
                position: "absolute",
                bottom: 0,
                transform: "translate(-50%)",
                left: "50%",
              }}
            >
              Купи карта
            </CustomButton>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
