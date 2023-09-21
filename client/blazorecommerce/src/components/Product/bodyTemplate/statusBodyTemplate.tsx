import { ProductType } from "@/src/utils/types.js";
import { Checkbox } from "primereact/checkbox";

const statusBodyTemplate = (product: ProductType) => {
  return (
    <div className="ms-6 card flex flex-col gap-3">
      <div className="flex items-center">
        <Checkbox
          inputId="featured"
          name="featured"
          disabled
          checked={product.featured}
        />
        <label htmlFor="featured" className="ml-2">
          Featured
        </label>
      </div>
      <div className="flex items-center">
        <Checkbox
          inputId="visible"
          name="visible"
          disabled
          checked={product.visible}
        />
        <label htmlFor="visible" className="ml-2">
          Visible
        </label>
      </div>
      <div className="flex items-center">
        <Checkbox
          inputId="deleted"
          name="deleted"
          disabled
          checked={product.deleted}
        />
        <label htmlFor="deleted" className="ml-2">
          Deleted
        </label>
      </div>
    </div>
  );
};

export default statusBodyTemplate;
