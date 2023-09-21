import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductType } from "../utils/types";
import useGetFromApi from "../hooks/useGetFromApi.tsx";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import productBodyTemplate from "../components/Product/bodyTemplate/productBodyTemplate.tsx";
import categoryBodyTemplate from "../components/Product/bodyTemplate/categoryBodyTemplate.tsx";
import variantsBodyTemplate from "../components/Product/bodyTemplate/variantsBodyTemplate.tsx";
import statusBodyTemplate from "../components/Product/bodyTemplate/statusBodyTemplate.tsx";
import actionsBodyTemplate from "../components/Product/bodyTemplate/actionsBodyTemplate.tsx";

type Props = {};

type ResultType = {
  products: ProductType[];
};

const Product = (props: Props) => {
  const [products, setProducts] = React.useState<ProductType[] | null>(null);
  const data = useGetFromApi<ResultType>("product")?.products;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  return products?.length == 0 ? (
    <div className="flex mx-auto items-center">
      <ProgressSpinner />
    </div>
  ) : (
    <div className="container mt-6 flex flex-col">
      <Button
        className="ms-auto w-1/5 mb-6"
        gradientDuoTone="greenToBlue"
        outline
        onClick={() => navigate("create")}
      >
        Create New Product
      </Button>
      <DataTable
        value={products!}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        tableStyle={{ minWidth: "50rem", height: "250px", maxHeight: "250px" }}
      >
        <Column
          header="Product"
          body={productBodyTemplate}
          align={"center"}
        ></Column>
        <Column
          header="Category"
          body={categoryBodyTemplate}
          align={"center"}
        ></Column>
        <Column
          header="Variants"
          body={variantsBodyTemplate}
          align={"center"}
        ></Column>
        <Column
          header="Status"
          body={statusBodyTemplate}
          align={"center"}
        ></Column>
        <Column
          header="Actions"
          body={actionsBodyTemplate}
          align={"center"}
        ></Column>
      </DataTable>
    </div>
  );
};

export default Product;
