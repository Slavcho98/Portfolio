import { useQuery } from "@tanstack/react-query";
import { getCalendarEvents } from "../services/apiEvents";

export function useCalendar() {
  const {
    isLoading,
    data: eventsSchedule,
    error,
  } = useQuery({
    queryKey: ["eventsSchedule"],
    queryFn: getCalendarEvents,
  });

  return { isLoading, error, eventsSchedule };
}
