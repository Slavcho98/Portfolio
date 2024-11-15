import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { navData } from "./NavData";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

export default function MenuLinks({
  onLinkClick,
}: {
  onLinkClick: () => void;
}) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (id: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <List>
      {navData.map((item) => (
        <div key={item.id || item.to}>
          {item.links ? (
            <>
              <ListItem onClick={() => handleToggle(item.id)}>
                <ListItemText primary={item.label} />
                {openSections[item.id] ? (
                  <MdOutlineExpandLess />
                ) : (
                  <MdOutlineExpandMore />
                )}
              </ListItem>

              <Collapse in={openSections[item.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.links.map((link) => (
                    <ListItemButton
                      key={link.to}
                      component={NavLink}
                      to={link.to}
                      sx={{
                        borderBottom: "1px solid #EBF4F6",
                        pl: 4,
                      }}
                      onClick={() => {
                        onLinkClick(); 
                      }}
                    >
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </>
          ) : (
            <ListItemButton
              component={NavLink}
              to={item.to}
              onClick={onLinkClick} 
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          )}
        </div>
      ))}
    </List>
  );
}
