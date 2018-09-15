import { Table } from "semantic-ui-react";
import React from "react";

// stateless functional component
const SectionsTableHeader = () => {
  return (
    <Table.Row>
      <Table.HeaderCell></Table.HeaderCell>
      <Table.HeaderCell>Section</Table.HeaderCell>
      <Table.HeaderCell>CRN</Table.HeaderCell>
      <Table.HeaderCell>Time</Table.HeaderCell>
      <Table.HeaderCell>Day(s)</Table.HeaderCell>
      <Table.HeaderCell>Location</Table.HeaderCell>
      <Table.HeaderCell>Instructor</Table.HeaderCell>
      <Table.HeaderCell>Units</Table.HeaderCell>
      <Table.HeaderCell>Enrolled</Table.HeaderCell>
    </Table.Row>
  );
};

export default SectionsTableHeader;