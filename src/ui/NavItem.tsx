import { useState } from "react";
import { ListItem, ListItemButton } from "@mui/material";
import CustomNavLink from "./CustomNavLink";
import DropdownLinks from "./DropdownLink";

interface NavItemProps {
  id?: string;
  label: string;
  links?: { to: string; label: string; isSpecialItem?: boolean }[];
  to?: string;
}

const NavItem = ({ id, label, links, to }: NavItemProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const handleMouseEnter = () => setHoveredId(id || null);
  const handleMouseLeave = () => setHoveredId(null);

  return (
    <ListItem
      id={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        marginRight: "1rem",
        fontSize: ".9em",
        position: "relative",
        width: "auto",
        display: "block",
        px: 0,
        py: 0,
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "0%",
          height: "1.5px",
          backgroundColor: "#E87B22",
          transition: "width 0.5s ease",
        },
        "&:hover::after": {
          width: "100%",
        },
      }}
    >
      {to ? (
        <ListItemButton
          component={CustomNavLink}
          to={to}
          sx={{
            display: "inline",
            textDecoration: "none",
            color: "#0F294A",
            p: links ? "0 0 31px" : "0",
            position: "relative",
            transition: "color 0.3s ease",
            "&.active": {
              color: "#E87B22",
            },
            "&:hover": {
              backgroundColor: "transparent",
            },
            "& .MuiTouchRipple-root": {
              display: "none",
            },
          }}
        >
          {label}
        </ListItemButton>
      ) : (
        <span
          style={{
            textDecoration: "none",
            color: "#0F294A",
            fontWeight: "normal",
            cursor: "pointer",
            padding: "0 0 31px",
          }}
        >
          {label}
        </span>
      )}

      {links && hoveredId === id && <DropdownLinks links={links} />}
    </ListItem>
  );
};

export default NavItem;
