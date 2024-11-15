import styles from "./Logo.module.css";
import Button from "./Button";

function Logo() {
  return (
    <Button el="link" to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Button>
  );
}

export default Logo;
