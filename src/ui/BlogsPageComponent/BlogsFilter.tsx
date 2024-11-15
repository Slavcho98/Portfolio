import { Box, Button } from "@mui/material";

function BlogsFilter() {
  const categories = [
    "Сите",
    "Регрутирање",
    "Компензации",
    "HR согласност",
    "Организациска структура",
    "Обучување",
    "Развој",
    "Менаџмент на перформанси",
  ];

  return (
    <Box
      sx={{
        width: "85%",
        mx: "auto",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      {categories.map((item, index) => (
        <Button
          key={index}
          sx={{
            fontSize: ".7em",
            borderRadius: "20px",
            px: "1rem",
            textTransform: "none",
            backgroundColor: "#fff",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
            color: "#21383E",
            fontWeight: "400",
          }}
        >
          {item}
        </Button>
      ))}
    </Box>
  );
}
export default BlogsFilter;
