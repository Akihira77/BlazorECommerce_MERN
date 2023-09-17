import React from "react";
import { CategoryType } from "../../utils/types";
import { Table } from "flowbite-react";
import EditCategory from "./EditCategory.tsx";
import DeleteCategory from "./DeleteCategory.tsx";

type Props = {
  categories?: CategoryType[];
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainTable = ({ categories, setFlag }: Props) => {
  return (
    <Table hoverable style={{ marginTop: "1rem" }}>
      <Table.Head>
        <Table.HeadCell align="center">Name</Table.HeadCell>
        <Table.HeadCell align="center">Url</Table.HeadCell>
        <Table.HeadCell align="center">Actions</Table.HeadCell>
      </Table.Head>

      <Table.Body className="divide-y">
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
                <div>
                  <EditCategory
                    setFlag={setFlag}
                    categoryId={item.id}
                    categoryName={item.name}
                    categoryUrl={item.url}
                  />
                </div>
                <div>
                  <DeleteCategory
                    setFlag={setFlag}
                    categoryId={item.id}
                    categoryName={item.name}
                    categoryUrl={item.url}
                  />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default MainTable;
