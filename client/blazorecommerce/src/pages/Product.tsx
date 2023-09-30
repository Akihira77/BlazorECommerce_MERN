import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductType } from "../utils/types";
import useGetFromApi from "../hooks/useGetFromApi.tsx";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import ProductBodyTemplate from "../components/Product/bodyTemplate/ProductBodyTemplate.tsx";
import CategoryBodyTemplate from "../components/Product/bodyTemplate/CategoryBodyTemplate.tsx";
import VariantsBodyTemplate from "../components/Product/bodyTemplate/VariantsBodyTemplate.tsx";
import StatusBodyTemplate from "../components/Product/bodyTemplate/StatusBodyTemplate.tsx";
import ActionsBodyTemplate from "../components/Product/bodyTemplate/ActionsBodyTemplate.tsx";

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

    return (
        products && (
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
                    lazy
                    value={products!}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    tableStyle={{
                        minWidth: "50rem",
                        height: "250px",
                        maxHeight: "250px",
                    }}
                >
                    <Column
                        header="Product"
                        body={ProductBodyTemplate}
                        align={"center"}
                    ></Column>
                    <Column
                        header="Category"
                        body={CategoryBodyTemplate}
                        align={"center"}
                    ></Column>
                    <Column
                        header="Variants"
                        body={VariantsBodyTemplate}
                        align={"center"}
                    ></Column>
                    <Column
                        header="Status"
                        body={StatusBodyTemplate}
                        align={"center"}
                    ></Column>
                    <Column
                        header="Actions"
                        body={ActionsBodyTemplate}
                        align={"center"}
                    ></Column>
                </DataTable>
            </div>
        )
    );
};

export default Product;
