import { LazyLoadImage } from "react-lazy-load-image-component";

type GenderCardProps = {
  src: string;
  alt: string;
  label: string;
};

function GenderCard({ src, alt, label }: GenderCardProps) {
  return (
    <div className="relative overflow-hidden group cursor-pointer">
      <LazyLoadImage
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
      />
      <div
        className="absolute bottom-0 w-full bg-black bg-opacity-40 
            h-[20vh] group-hover:h-full transition-all duration-300 ease-in-out flex 
            justify-center items-center  rounded-lg"
      >
        <p className="text-white uppercase text-2xl tracking-wide font-medium">
          {label}
        </p>
      </div>
    </div>
  );
}

export default GenderCard;
