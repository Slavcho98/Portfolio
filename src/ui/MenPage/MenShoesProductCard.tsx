interface ProductProps {
  img: string;
  title: string;
  gender: string;
  price: number;
}

type SingleProduct = {
  product: ProductProps;
};

function MenShoesProductCard({ product }: SingleProduct) {
  return (
    <div className="w-1/3 ">
      <div
        className="shadow-custom rounded-md p-3 mr-5 
      mb-5 bg-[#f2f0ea] cursor-pointer"
      >
        <div>
          <img
            src={`${product.img}`}
            alt=""
            className="h-[250px] object-contain"
          />
        </div>

        <div className="border-t border-t-black pt-4">
  <h3 className="font-medium">{product.title}</h3>
  <p className="py-2">{product.gender}</p>
  <span className="font-bold">${product.price}</span>
</div>

      </div>
    </div>
  );
}

export default MenShoesProductCard;
