import { SxProps } from "@mui/material";

export const calendarStyles = {
  root: {
    backgroundColor: "#fff",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    p: 0,
    borderRadius: 2,
    height: "60vh",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  } as SxProps,
  leftPane: {
    flex: 1,
    py: 1.5,
    px: 2,
    overflow: "hidden",
    borderRight: "1px solid #1A1A1A1A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pb: 5,
  } as SxProps,
  rightPane: {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 1.5,
    px: 2,
  } as SxProps,
  dayPicker: {
    width: "100%",
    height: "100%",
    "& .css-23p0if-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)": {
      border: "none",
      color: "#E87B22",
    },
    "& .MuiDayPicker-day": {
      position: "relative",
      backgroundColor: "#000",
      "&:hover": {
        backgroundColor: "#F5F5F5",
      },
    },
    "& .Mui-selected": {
      color: "#E87B22 !important",
      backgroundColor: "#E87B2233!important",
      "&::after": {
        content: '""',
        position: "absolute",
        left: "50%",
        bottom: "8px",
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        backgroundColor: "#E87B22",
        transform: "translateX(-50%)",
      },
    },
    "& .MuiDayPicker-day.Mui-disabled": {
      backgroundColor: "#f5f5f5 !important",
    },
  } as SxProps,
};
