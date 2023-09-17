import { useEffect, useState } from "react";
import { getFromApi } from "../utils/axiosCommand.ts";
import {
  SuccessResponse,
  ErrorResponse,
  ProductTypesType,
} from "../utils/types.ts";
import CreateProductType from "../components/ProductType/CreateProductType.tsx";
import MainTable from "../components/ProductType/MainTable.tsx";

type Props = {};

const ProductType = (props: Props) => {
  const [productTypes, setProductTypes] = useState<ProductTypesType[]>();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    async function callApi() {
      const response = await getFromApi("product-type");

      if ("data" in response) {
        setProductTypes((response as SuccessResponse).data.productTypes);
      } else {
        console.log((response as ErrorResponse).msg);
      }
    }

    callApi();
  }, [flag]);

  return (
    <div className="pt-5 relative container mr-4">
      <CreateProductType setFlag={setFlag} />
      <MainTable productTypes={productTypes} setFlag={setFlag} />
    </div>
  );
};

export default ProductType;
