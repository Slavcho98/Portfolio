import MenShoesList from "../ui/MenPage/MenShoesList";

function Men() {
  return (
    <div className="w-11/12 pt-10 mx-auto flex">
      <div className="w-1/3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores,
          commodi!
        </p>
      </div>
      <div className="w-2/3">
        <MenShoesList />
      </div>
    </div>
  );
}

export default Men;
