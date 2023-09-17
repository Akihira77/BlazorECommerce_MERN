import React from "react";
import { Table } from "flowbite-react";
import { ProductTypesType } from "../../utils/types";
import EditProductType from "./EditProductType.tsx";
import DeleteProductType from "./DeleteProductType.tsx";

type Props = {
  productTypes?: ProductTypesType[];
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainTable = ({ productTypes, setFlag }: Props) => {
  return (
    <Table hoverable style={{ marginTop: "1rem" }}>
      <Table.Head>
        <Table.HeadCell align={"center"}>Name</Table.HeadCell>
        <Table.HeadCell align={"center"}>Category</Table.HeadCell>
        <Table.HeadCell align={"center"}>Actions</Table.HeadCell>
      </Table.Head>

      <Table.Body className="divide-y">
        {productTypes &&
          productTypes.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.category.name}</Table.Cell>
              <Table.Cell
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <EditProductType
                    productTypeCategory={item.category.name}
                    setFlag={setFlag}
                    productTypeId={item.id}
                    productTypeName={item.name}
                  />
                </div>
                <div>
                  <DeleteProductType
                    setFlag={setFlag}
                    productTypeId={item.id}
                    productTypeName={item.name}
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
