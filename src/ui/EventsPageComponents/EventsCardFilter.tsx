import { Typography } from "@mui/material";
import {
  getHRcoffee,
  getHRconference,
  getHRwebinar,
  getHRweekend,
} from "../../services/apiEvents";
import BlogsCards from "../BlogsCards";

import { useSearchParams } from "react-router-dom";
import { useSearchContext } from "../../context/SearchContext";
import { EventSection } from "../../types/type";

function EventsCardFilter() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("category") || "сите";
  const { searchTerm } = useSearchContext();

  const eventSections: Record<string, EventSection> = {
    HRcoffee: {
      queryFn: getHRcoffee,
      queryKey: "HRcoffee",
      label: "HR Кафе",
    },
    HRweekend: {
      queryFn: getHRweekend,
      queryKey: "HRweekend",
      label: "HR Викенд",
    },
    HRwebinar: {
      queryFn: getHRwebinar,
      queryKey: "HRwebinar",
      label: "HR Вебинар",
    },
    HRconference: {
      queryFn: getHRconference,
      queryKey: "HRconference",
      label: "HR Конференции",
    },
  };

  let filteredEvents: EventSection[] = [];

  if (filterValue === "сите") {
    filteredEvents = Object.values(eventSections);
  } else if (filterValue === "hr-кафе") {
    filteredEvents = [eventSections.HRcoffee];
  } else if (filterValue === "hr-викенд") {
    filteredEvents = [eventSections.HRweekend];
  } else if (filterValue === "hr-вебинар") {
    filteredEvents = [eventSections.HRwebinar];
  } else if (filterValue === "hr-конференции") {
    filteredEvents = [eventSections.HRconference];
  }

  if (searchTerm) {
    filteredEvents = filteredEvents.filter((event) =>
      event.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div>
      {filteredEvents.map((event) => (
        <BlogsCards
          sx={{ pt: "5rem" }}
          key={event.queryKey}
          queryFn={event.queryFn}
          queryKey={event.queryKey}
        >
          <Typography variant="h5" fontWeight={600}>
            {event.label}
          </Typography>
        </BlogsCards>
      ))}
    </div>
  );
}

export default EventsCardFilter;
