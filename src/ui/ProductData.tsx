import { FaRegHeart } from "react-icons/fa";
import Button from "./Button";
import { LuShoppingBag } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import Sizes from "./ProductPage/Sizes";
import Variants from "./ProductPage/Variants";

function ProductData() {
  return (
    <div className="w-1/2">
      <div className="flex justify-between">
        <p className="capitalize font-semibold">nike</p>
        <p>HR1325R00-8</p>
      </div>
      <h2 className="capitalize font-semibold text-2xl py-3">
        shoes nike air max 90
      </h2>
      <div className="flex">
        <span>⭐⭐⭐⭐⭐</span>
        <span>42 reviews</span>
      </div>
      <p className="text-4xl font-bold py-8">$199.00</p>
      <Variants />
      <Sizes />
      <div className="flex gap-4 pt-8">
        <Button
          el="button"
          className="flex justify-center items-center gap-4 text-lg w-full rounded-md bg-black text-white"
        >
          <LuShoppingBag /> Add to cart
        </Button>

        <Button
          el="button"
          className="rounded-md bg-[#f2f0ea] border-black p-4"
        >
          <FaRegHeart className="text-xl" />
        </Button>
      </div>
      <p className="flex items-center font-medium gap-2 pt-2">
        <CiDeliveryTruck className="text-2xl" />
        Free delivery on orders over $30
      </p>
    </div>
  );
}

export default ProductData;
