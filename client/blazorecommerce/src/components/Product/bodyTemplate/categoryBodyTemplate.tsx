import { ProductType } from "@/src/utils/types.js";

const CategoryBodyTemplate = (product: ProductType) => {
  return <p>{product.category.name}</p>;
};

export default CategoryBodyTemplate;
