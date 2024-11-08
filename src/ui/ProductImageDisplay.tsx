function ProductImageDisplay() {
  return (
    <div className="w-1/2">
      <div className="bg-[#f2f0ea] w-3/4 h-[80vh] px-5 rounded-md mb-5 ">
        <img src="/shoes/nike_airmax_90_1.png" alt="" className="" />
      </div>
      <div className="flex space-x-4 w-3/4">
        <div className="bg-[#f2f0ea] rounded-md p-2">
          <img src="/shoes/nike_airmax_90_1.png" alt="nike airmax shoes" />
        </div>
        <div className="bg-[#f2f0ea] rounded-md p-2">
          <img src="/shoes/nike_airmax_90_2.png" alt="nike airmax shoes" />
        </div>
        <div className="bg-[#f2f0ea] rounded-md p-2">
          <img src="/shoes/nike_airmax_90_3.png" alt="nike airmax shoes" />
        </div>
        <div className="bg-[#f2f0ea] rounded-md p-2">
          <img src="/shoes/nike_airmax_90_4.png" alt="nike airmax shoes" />
        </div>
      </div>
    </div>
  );
}

export default ProductImageDisplay;
