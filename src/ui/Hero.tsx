import { HiOutlineArrowLongRight } from "react-icons/hi2";

function Hero() {
  return (
    <section className="w-11/12 mx-auto my-5">
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-4 h-full relative">
          <img
            src="/hero6.jpg"
            alt="Main Hero Image"
            className="w-full h-[80vh] object-cover rounded-lg"
          />
          <div
            className="absolute inset-0 bg-black bg-opacity-50 rounded-lg
           flex items-center justify-center"
          >
            <div className="text-center text-white px-4">
              <h2 className="text-4xl font-bold mb-2">Step Up Your Style</h2>
              <p className="text-lg font-light">
                Discover the Latest in Sneakers – Unmatched Comfort, Unstoppable
                Style.
              </p>
              <button
                className="mt-4 px-6 py-2 bg-white text-black rounded-lg 
              font-medium hover:bg-gray-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-1 grid grid-rows-2 gap-2 h-full">
          <div className="row-span-2 relative group">
            <img
              src="/jordans.jpg"
              alt="Secondary Hero Image 1"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0  bg-black bg-opacity-40 rounded-lg flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center mb-4 gap-2">
                <span className="text-white text-xl">Discover</span>
                <HiOutlineArrowLongRight className="text-2xl text-white" />
              </div>
            </div>
          </div>
          <div className="row-span-1 h-[30vh] relative group">
            <img
              src="/hero3.jpeg"
              alt="Secondary Hero Image 2"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center mb-4 gap-2">
                <span className="text-white text-xl">Discover</span>
                <HiOutlineArrowLongRight className="text-2xl text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
