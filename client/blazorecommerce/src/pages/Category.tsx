import React from "react";
import CreateCategory from "../components/Category/CreateCategory.tsx";
import MainTable from "../components/Category/MainTable.tsx";
import useGetFromApi from "../hooks/useGetFromApi.tsx";
import { CategoryResultType } from "../components/Category/type.ts";
import { CategoryType } from "../utils/types";
import { ProgressSpinner } from "primereact/progressspinner";
import { useCookies } from "react-cookie";

type Props = {};

const Category = (props: Props) => {
    const data = useGetFromApi<CategoryResultType>("category")?.categories;
    const [categories, setCategories] = React.useState<CategoryType[]>([]);
    const [cookies, setCookies] = useCookies(["token"]);

    React.useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    return categories.length == 0 ? (
        <div className="flex mx-auto items-center">
            <ProgressSpinner />
        </div>
    ) : (
        <div className="pt-5 relative container mr-4">
            <CreateCategory
                setCategories={setCategories}
                token={cookies.token ?? "Missing Token"}
            />
            <MainTable
                setCategories={setCategories}
                categories={categories}
                token={cookies.token ?? "Missing Token"}
            />
        </div>
    );
};

export default Category;
