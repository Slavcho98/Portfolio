import GenderCard from "./GenderCard";

function GenderTypes() {
  return (
    <section className="w-3/4 mx-auto py-10">
      <div className="flex justify-center items-center gap-5">
        <GenderCard src="/men.jpg" label="men" alt="men" />
        <GenderCard src="/women.jpg" label="women" alt="women" />
        <GenderCard src="/kids.jpg" label="kids" alt="kids" />
      </div>
    </section>
  );
}

export default GenderTypes;
