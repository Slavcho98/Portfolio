import { LuShoppingBag } from "react-icons/lu";
import Button from "./Button";
import { FaRegHeart } from "react-icons/fa";

function Avatar() {
  return (
    <div className="flex gap-5 items-center">
      <Button el="button">
        <LuShoppingBag className="text-xl" />
      </Button>
      <Button el="button">
        <FaRegHeart className="text-xl" />
      </Button>
      <div
        className="w-12 h-12 rounded-full bg-[url('/public/avatar.jpg')] 
        bg-cover bg-center"
      ></div>
    </div>
  );
}

export default Avatar;
