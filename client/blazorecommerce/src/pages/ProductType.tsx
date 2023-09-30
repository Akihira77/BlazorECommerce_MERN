import React from "react";
import CreateProductType from "../components/ProductType/CreateProductType.tsx";
import MainTable from "../components/ProductType/MainTable.tsx";
import useGetFromApi from "../hooks/useGetFromApi.tsx";
import { ProductTypeResultType } from "../components/ProductType/type.ts";
import { ProductTypesType } from "../utils/types";
import { ProgressSpinner } from "primereact/progressspinner";
import { useCookies } from "react-cookie";

type Props = {};

const ProductType = (props: Props) => {
    const [productTypes, setProductTypes] = React.useState<ProductTypesType[]>(
        []
    );
    const [cookies, setCookies] = useCookies(["token"]);

    const data =
        useGetFromApi<ProductTypeResultType>("product-type")?.productTypes;

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
            <CreateProductType
                setProductTypes={setProductTypes}
                token={cookies.token}
            />
            <MainTable
                productTypes={productTypes}
                setProductTypes={setProductTypes}
                token={cookies.token}
            />
        </div>
    );
};

export default ProductType;
