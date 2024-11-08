import GenderCard from "./GenderCard";
import { Link } from "react-router-dom";

function GenderTypes() {
  return (
    <section className="w-3/4 mx-auto py-10">
      <div className="flex justify-center items-center gap-5">
        <Link to="/men" className="w-1/3">
          <GenderCard src="/men.jpg" label="men" alt="men" />
        </Link>
        <Link to="/women" className="w-1/3">
          <GenderCard src="/women.jpg" label="women" alt="women" />
        </Link>
        <Link to="/kids" className="w-1/3">
          <GenderCard src="/kids.jpg" label="kids" alt="kids" />
        </Link>
      </div>
    </section>
  );
}

export default GenderTypes;
