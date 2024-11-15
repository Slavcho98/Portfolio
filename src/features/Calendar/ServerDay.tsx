import React from "react";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { Badge } from "@mui/material";
import { FaCircle } from "react-icons/fa";
import { Dayjs } from "dayjs";

const ServerDay = React.memo(
  (props: PickersDayProps<Dayjs> & { highlightedDays?: Dayjs[] }) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected = !outsideCurrentMonth &&
      highlightedDays.some((highlightedDay) => highlightedDay.isSame(day, "day"));

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={
          isSelected ? (
            <FaCircle style={{ fontSize: "8px", color: "#E87B22" }} />
          ) : undefined
        }
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }
);

export default ServerDay;
