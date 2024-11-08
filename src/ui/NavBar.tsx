import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="w-11/12 mx-auto py-5 border-b border-[#a4a4a4]">
      <ul className="flex gap-7 capitalize">
        <li className="font-medium">
          <NavLink to="/women" className="focus:text-red-500">
            women
          </NavLink>
        </li>
        <li className="font-medium">
          <NavLink to="/men" className="focus:text-red-500">
            men
          </NavLink>
        </li>
        <li className="font-medium">
          <NavLink to="/kids" className="focus:text-red-500">
            kids
          </NavLink>
        </li>
        <li className="font-medium">
          <NavLink to="/sport" className="focus:text-red-500">
            sport
          </NavLink>
        </li>
        <li className="font-medium">
          <NavLink to="/brands" className="focus:text-red-500">
            brands
          </NavLink>
        </li>
        <li className="font-medium">
          <NavLink to="/new" className="focus:text-red-500">
            new
          </NavLink>
        </li>
        <li className="font-medium">
          <NavLink to="/sale" className="focus:text-red-500">
            sale
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
