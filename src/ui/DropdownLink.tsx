import { Box, ListItemButton } from "@mui/material";
import CustomNavLink from "./CustomNavLink";

interface DropdownLinksProps {
  links: { to: string; label: string; isSpecialItem?: boolean }[];
}

const DropdownLinks = ({ links }: DropdownLinksProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "43px",
        left: 0,
        mt: 1,
        p: "1 1.5",
        bgcolor: "rgba(255, 255, 255)",
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        whiteSpace: "nowrap",
      }}
    >
      {links.map(({ to, label, isSpecialItem }) => (
        <ListItemButton
          key={label}
          component={CustomNavLink}
          to={to}
          sx={{
            textDecoration: "none",
            color: "#0F294A",
            display: "block",
            position: "relative",
            borderBottom: isSpecialItem ? "none" : "1px solid #EBF4F6",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
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
            "&.active::after": {
              width: "100%",
            },
            "&.active": {
              color: "#E87B22",
            },
          }}
        >
          {label}
        </ListItemButton>
      ))}
    </Box>
  );
};

export default DropdownLinks;
