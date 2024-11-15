import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import Button from "./Button";
import { IoMenu, IoClose } from "react-icons/io5";
import HamburgerMenu from "./HamburgerMenu";

function PageNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>

      <Button el="button" className={styles.MenuButton} onClick={toggleMenu}>
        {isMenuOpen ? <IoClose /> : <IoMenu />}
      </Button>

      {isMenuOpen && <HamburgerMenu />}
    </nav>
  );
}

export default PageNav;
