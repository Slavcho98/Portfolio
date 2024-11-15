import { NavLink } from "react-router-dom";
import styles from "./HamburgerMenu.module.css";

function HamburgerMenu() {
  return (
    <div className={`${styles.hamburgerMenu}`}>
      <ul className={styles.secondUl}>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default HamburgerMenu;
