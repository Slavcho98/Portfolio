import Avatar from "./Avatar";
import Logo from "./Logo";

import Search from "./Search";

function Header() {
  return (
    <div className="flex items-center justify-between w-11/12 mx-auto">
      <Logo />
      <Search/>
      <Avatar />
    </div>
  );
}

export default Header;
