import { List } from "@mui/material";
import NavItem from "./NavItem";
import SearchToggle from "./SearchToggle";
import { navData } from "./NavData";

const NavItems = () => {
  return (
    <List
      sx={{
        display: { xs: "none", sm: "flex", alignItems: "center" },
        listStyle: "none",
        m: 0,
        p: 0,
      }}
    >
      {navData.map(({ id, label, links, to }) => (
        <NavItem key={id || to} id={id} label={label} links={links} to={to} />
      ))}

      <SearchToggle />
    </List>
  );
};

export default NavItems;
