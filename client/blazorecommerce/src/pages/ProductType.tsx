import React from "react";
import CreateProductType from "../components/ProductType/CreateProductType.tsx";
import MainTable from "../components/ProductType/MainTable.tsx";
import useGetFromApi from "../hooks/useGetFromApi.tsx";
import { ResultType } from "../components/ProductType/type.ts";
import { ProductTypesType } from "../utils/types";
import { ProgressSpinner } from "primereact/progressspinner";

type Props = {};

const ProductType = (props: Props) => {
  const [productTypes, setProductTypes] = React.useState<ProductTypesType[]>(
    []
  );

  const data = useGetFromApi<ResultType>("product-type")?.productTypes;

  React.useEffect(() => {
    if (data) {
      setProductTypes(data);
    }
  }, [data]);

  return productTypes.length == 0 ? (
    <div className="flex mx-auto items-center">
      <ProgressSpinner />
    </div>
  ) : (
    <div className="pt-5 relative container mr-4">
      <CreateProductType setProductTypes={setProductTypes} />
      <MainTable
        productTypes={productTypes}
        setProductTypes={setProductTypes}
      />
    </div>
  );
};

export default ProductType;
