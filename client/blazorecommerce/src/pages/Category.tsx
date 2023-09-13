import { Container, Table, Box } from "@radix-ui/themes";
import CreateCategory from "../components/Category/CreateCategory.tsx";
import EditCategory from "../components/Category/EditCategory.tsx";
import DeleteCategory from "../components/Category/DeleteCategory.tsx";
import { useEffect, useState } from "react";
import { getFromApi } from "../utils/axiosCommand.ts";
import {
  SuccessResponse,
  ErrorResponse,
  CategoryType,
} from "../utils/types.ts";

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
      <Table.Root variant="surface" style={{ marginTop: "1rem" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell justify={"center"}>
              Name
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={"center"}>
              Url
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={"center"}>
              Actions
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {categories &&
            categories.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.url}</Table.Cell>
                <Table.Cell
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <EditCategory
                      setFlag={setFlag}
                      categoryId={item.id}
                      categoryName={item.name}
                      categoryUrl={item.url}
                    />
                  </Box>
                  <Box>
                    <DeleteCategory
                      setFlag={setFlag}
                      categoryId={item.id}
                      categoryName={item.name}
                      categoryUrl={item.url}
                    />
                  </Box>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Container>
  );
};

export default Category;
