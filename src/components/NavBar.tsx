import { ReactNode } from "react";

export type ArrayOfObjects = {
  children: ReactNode;
};

function NavBar({ children }: ArrayOfObjects) {
  return <nav className="nav-bar">{children}</nav>;
}

export default NavBar;
