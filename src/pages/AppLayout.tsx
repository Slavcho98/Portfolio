import { Outlet } from "react-router-dom";
import NavBar from "../ui/NavBar";
import Header from "../ui/Header";

function AppLayout() {
  return (
    <>
      <Header />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
