import { ProductType } from "@/src/utils/types.js";

const productBodyTemplate = (product: ProductType) => {
  return (
    <div className="flex justify-center flex-col">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-32 mx-auto"
      />
      <h4 className="font-semibold pt-2">{product.title}</h4>
    </div>
  );
};

export default productBodyTemplate;
