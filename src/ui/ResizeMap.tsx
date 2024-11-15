import { useEffect } from "react";
import { useMap } from "react-leaflet";

function ResizeMapOnScreenChange() {
  const map = useMap();

  useEffect(() => {
    const handleResize = () => {
      map.invalidateSize();
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Invalidate size initially
    handleResize();

    // Clean up listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [map]);

  return null;
}

export default ResizeMapOnScreenChange;
