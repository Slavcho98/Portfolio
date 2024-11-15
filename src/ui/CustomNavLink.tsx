import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

const CustomNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, ...props }, ref) => {
    return <NavLink ref={ref} to={to} {...props} />;
  }
);

export default CustomNavLink;
