import { ProductType, VariantType } from "@/src/utils/types.js";
import { DataScroller } from "primereact/datascroller";
import { Tooltip } from "primereact/tooltip";

const VariantsBodyTemplate = (product: ProductType) => {
  function currencyFormat(num: number) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const itemTemplate = (data: VariantType) => {
    return (
      <>
        <Tooltip target=".price" mouseTrack mouseTrackLeft={10} />
        <Tooltip target=".original-price" mouseTrack mouseTrackLeft={10} />
        <div className="my-2">
          <h5 className="font-semibold">{data.productType.name}</h5>
          <p className="price" data-pr-tooltip="Price">
            {currencyFormat(data.price)}
          </p>
          <p className="original-price" data-pr-tooltip="Original Price">
            {currencyFormat(data.originalPrice)}
          </p>
        </div>
      </>
    );
  };

  return (
    <DataScroller
      value={product.variants}
      itemTemplate={itemTemplate}
      rows={5}
      inline
      scrollHeight="200px"
    />
  );
};

export default VariantsBodyTemplate;
