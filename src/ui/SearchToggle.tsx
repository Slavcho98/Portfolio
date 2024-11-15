import { useState } from "react";
import { Box, IconButton, Collapse } from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";
import SearchBar from "./SearchBar";

const SearchToggle = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => setSearchOpen((prev) => !prev);

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        color="inherit"
        aria-label="search"
        edge="start"
        sx={{ ml: ".5rem" }}
        onClick={toggleSearch}
      >
        <IoSearchOutline />
      </IconButton>

      <Box
        sx={{
          position: "absolute",
          top: "70px",
          right: 0,
          width: "30vw",
          zIndex: 10,
          bgcolor: "rgba(255, 255, 255, 0.93)",
          boxShadow: 1,
          borderRadius: "50vw",
        }}
      >
        <Collapse in={searchOpen} style={{ borderRadius: "50vw" }}>
          <SearchBar searchBarSx={{ width: 1 }} />
        </Collapse>
      </Box>
    </Box>
  );
};

export default SearchToggle;
    