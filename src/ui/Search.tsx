import { IoSearchOutline } from "react-icons/io5";
import Input from "./Input";

function Search() {
  return (
    <div className="py-5 flex justify-between items-center w-1/3 ">
      <div className="relative flex  w-full">
        <IoSearchOutline className="absolute left-3 top-3 text-gray-500" />
        <Input type="text" id="search"/>
      </div>
    </div>
  );
}

export default Search;
