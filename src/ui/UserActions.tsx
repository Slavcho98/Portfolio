import React from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import Notifications from "../features/Notifications/Notifications";
import UserAvatar from "./UserAvatar";
import Logout from "../authentication/Logout";
import { useUser } from "../authentication/useUser";
import CustomButton from "./CustomButton";
import LanguageSwitcher from "./LanguageSwitcher";

const UserActions: React.FC = () => {
  const { isAuthenticated, fetchStatus } = useUser();

  return isAuthenticated && fetchStatus ? (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Notifications />
      <LanguageSwitcher />
      <NavLink to="user" style={{ textDecoration: "none" }}>
        <UserAvatar />
      </NavLink>
      <Logout />
    </Box>
  ) : (
    <Box
      component="div"
      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
    >
      <LanguageSwitcher sx={{ mr: 20 }} />
      <NavLink to="signup" style={{ textDecoration: "none" }}>
        <CustomButton
          style={{
            position: "absolute",
            top: "50%",
            right: "10%",
            transform: "translate(50%, -50%)",
          }}
        >
          Зачлени се
        </CustomButton>
      </NavLink>
    </Box>
  );
};

export default UserActions;
