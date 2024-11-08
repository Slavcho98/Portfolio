function Variants() {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <span className="capitalize">color</span>
        <span> &gt; </span>
        <span className="capitalize">white</span>
      </div>

      <div className="flex w-full space-x-4">
        <div className="bg-[#f2f0ea] rounded-md h-16 w-14 flex justify-center items-end">
          <img
            src="/shoes/nike_airmax_90_black.png"
            alt="Nike Air Max 90"
            className="object-contain h-14"
          />
        </div>
        <div className="border bg-[#f2f0ea] rounded-md h-16 w-14 flex justify-center items-end">
          <img
            src="/shoes/nike_airmax_90_white.png"
            alt="Nike Air Max 90"
            className="object-contain h-14"
          />
        </div>
        <div className="bg-[#f2f0ea] h-16 w-14 flex justify-center items-end">
          <img
            src="/shoes/nike_airmax_90_gray.png"
            alt="Nike Air Max 90"
            className="object-contain h-14"
          />
        </div>
      </div>
    </div>
  );
}

export default Variants;
