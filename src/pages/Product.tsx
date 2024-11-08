import ProductData from "../ui/ProductData";
import ProductImageDisplay from "../ui/ProductImageDisplay";

function Product() {
  return (
    <div className="w-11/12 flex mx-auto py-10">
      <ProductImageDisplay />
      <ProductData />
    </div>
  );
}

export default Product;
