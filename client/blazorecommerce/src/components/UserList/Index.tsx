import React from "react";
import { Table } from "flowbite-react";

type Props = {};

const Index = (props: Props) => {
  return (
    <Table hoverable className="divider-y-2">
      <Table.Head>
        <Table.HeadCell>Full name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Group</Table.HeadCell>
      </Table.Head>

      <Table.Body>
        <Table.Row>
          <Table>Danilo Sousa</Table>
          <Table.Cell>danilo@example.com</Table.Cell>
          <Table.Cell>Developer</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table>Zahra Ambessa</Table>
          <Table.Cell>zahra@example.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table>Jasper Eriksson</Table>
          <Table.Cell>jasper@example.com</Table.Cell>
          <Table.Cell>Developer</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default Index;
