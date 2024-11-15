import Map from "../ui/Map";
import Sidebar from "../ui/Sidebar";
import User from "../ui/User";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
