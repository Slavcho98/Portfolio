import { Box, SxProps, TextField, Theme } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";

type Props = {
  searchBarSx?: SxProps<Theme>;
};

export default function SearchBar({ searchBarSx }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSearchTerm } = useSearchContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      searchParams.set("search", value);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  return (
    <Box
      sx={{
        boxShadow: "0px 30px 80px 0px #2F415833",
        borderRadius: "50vw",
      }}
    >
      <TextField
        label="Пребарај"
        size="small"
        variant="outlined"
        onChange={handleChange}
        sx={{
          
          "& .MuiOutlinedInput-root": {
            borderRadius: "50vw",
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& legend": {
              ml: 1,
            },
          },
          "& label": {
            ml: 1,
          },
          // "& label.Mui-focused": {
          //   color: "#E87B22",
          //   ml: 1,
          // },
          ...searchBarSx,
        }}
      />
    </Box>
  );
}
