import MenShoesProductCard from "./MenShoesProductCard";

const data = [
  {
    img: "/shoes/nike_airmax_90_black_1.png",
    title: "Nike Air Max 90",
    gender: "Male",
    price: 120,
  },
  {
    img: "/shoes/adidas_ultraboost_22.png",
    title: "Adidas Ultraboost 22",
    gender: "Male",
    price: 90,
  },
  {
    img: "/shoes/Puma_RS_X3_Puzzle.png",
    title: "Puma RS-X3 Puzzle",
    gender: "Male",
    price: 140,
  },
  {
    img: "/shoes/reebok_classic_leather.png",
    title: "Reebok Classic Leather",
    gender: "Male",
    price: 60,
  },
  {
    img: "/shoes/reebok_classic_leather.png",
    title: "Reebok Classic Leather",
    gender: "Male",
    price: 60,
  },
  {
    img: "/shoes/reebok_classic_leather.png",
    title: "Reebok Classic Leather",
    gender: "Male",
    price: 60,
  },
];

function MenShoesList() {
  return (
    <div className="flex flex-wrap items-center justify-center -mr-5">
      {data.map((product) => (
        <MenShoesProductCard product={product} key={product.title} />
      ))}
    </div>
  );
}

export default MenShoesList;
