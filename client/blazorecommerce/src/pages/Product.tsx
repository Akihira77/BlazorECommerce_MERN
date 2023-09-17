import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductType } from "../utils/types";
import useGetFromApi from "../hooks/useGetFromApi.tsx";

type Props = {};

type ResultType = {
  products: ProductType[];
};

const Product = (props: Props) => {
  const result = useGetFromApi<ResultType>("product");
  return (
    <div className="container mt-6">
      <DataTable
        value={result?.products}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="title" header="Title" style={{ width: "25%" }}></Column>
      </DataTable>
    </div>
  );
};

export default Product;
