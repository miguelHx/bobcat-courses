import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox, Table } from 'semantic-ui-react';

const sampleData = [{'key': 99}, {'key': 123}, {'key': 349832}];

const renderHeaderRow = () => {
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

const renderTableData = (data, index) => {
  // want number of rows to equal number of LECT sections + number of DISC sections + number of XXXX sections
  // so each element in data array must have each element inside each sections array
  return (
    <Table.Row key={index}>
      <Table.Cell><Checkbox checked={data['isSelected']} /></Table.Cell>
      <Table.Cell>{`${data['Section Number']} ${data['Course Component']}`}</Table.Cell>
      <Table.Cell>{data['CRN']}</Table.Cell>
      <Table.Cell>{`${data['Start Time']}-${data['End Time']}`}</Table.Cell>
      <Table.Cell>{data['Days']}</Table.Cell>
      <Table.Cell>{data['Location']}</Table.Cell>
      <Table.Cell>{data['Instructor']}</Table.Cell>
      <Table.Cell>{data['Units']}</Table.Cell>
      <Table.Cell>{`${data['Act Enrl']}/${data['Max Enrl']}`}</Table.Cell>
    </Table.Row>
  );
};


const SectionsTable = (props) => {
  const dept = props.department;
  const course = props.course;
  const courseSections = window.jsonData[dept][course]['sections'];
  const sectionData = window.jsonData[dept][course]['sections'];
  return (
    <div>
      <Table
        striped
        unstackable
        headerRow={renderHeaderRow()}
        renderBodyRow={renderTableData} // this will map over tableData
        tableData={props.sectionsList}
        collapsing={true}
        selectable={true}
        color='blue'
      >
      </Table>
    </div>
  );
};

export default SectionsTable;
