import { ProductType } from "@/src/utils/types.js";

const categoryBodyTemplate = (product: ProductType) => {
  return <p>{product.category.name}</p>;
};

export default categoryBodyTemplate;
