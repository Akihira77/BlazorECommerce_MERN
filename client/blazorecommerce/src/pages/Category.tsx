import { Container } from "@radix-ui/themes";
import CreateCategory from "../components/Category/CreateCategory.tsx";
import { useEffect, useState } from "react";
import { getFromApi } from "../utils/axiosCommand.ts";
import {
  SuccessResponse,
  ErrorResponse,
  CategoryType,
} from "../utils/types.ts";
import MainTable from "../components/Category/MainTable.tsx";

type Props = {};

const Category = (props: Props) => {
  const [categories, setCategories] = useState<CategoryType[]>();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    async function callApi() {
      const response = await getFromApi("category");

      if ("data" in response) {
        setCategories((response as SuccessResponse).data.categories);
      } else {
        console.log((response as ErrorResponse).msg);
      }
    }

    callApi();
  }, [flag]);

  return (
    <Container pt={"5"} size={"4"} position={"relative"}>
      <CreateCategory setFlag={setFlag} />
      <MainTable setFlag={setFlag} categories={categories} />
    </Container>
  );
};

export default Category;
