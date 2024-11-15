import { Box } from "@mui/material";
import Filter from "./Filter";


function EventsFilter() {
  return (
    <Box sx={{width: "85%", mx: "auto"}}>
      <Filter filterField="category" options={[
        {value: "сите", label: "Сите"},
        {value: "hr-кафе",  label: "HR Кафе",},
        {value: "hr-викенд", label: "HR Викенд"},
        {value: "hr-вебинар", label: "HR Вебинар"},
        {value: "hr-конференции", label: "HR Конференции"}
      ]}/>
    </Box>
  );
}

export default EventsFilter;
