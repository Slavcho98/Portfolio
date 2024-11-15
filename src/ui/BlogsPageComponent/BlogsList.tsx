import { Box } from "@mui/material";

import Filter from "../EventsPageComponents/Filter";

function BlogsList() {
  const filterOptions = [
    { value: "сите", label: "Сите" },
    { value: "регрутирање", label: "Регрутирање" },
    { value: "компензации", label: "Компензации" },
    { value: "hr-согласност", label: "HR Согласност" },
    { value: "орг-структура", label: "Организациска структура" },
    { value: "обучување", label: "Обучување" },
    { value: "развој", label: "Развој" },
    { value: "менаџмент-перформанс", label: "Менаџмент на перформанси" },
  ];

  return (
    <Box sx={{ width: "85%", mx: "auto" }}>
      <Filter
        buttonSx={{ whiteSpace: "nowrap", fontSize: "0.72rem" }}
        filterField="category"
        options={filterOptions}
        defaultValue="сите"
      />
    </Box>
  );
}

export default BlogsList;
