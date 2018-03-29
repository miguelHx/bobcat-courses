import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox, Table } from 'semantic-ui-react';

const sampleData = ['data1': 99, 'data2': 123, 'data3': 349832];

const renderHeaderRow = () => {
  return (
    <Table.Row>
      <Table.HeaderCell>sample header</Table.HeaderCell>
    </Table.Row>
  );
};

const renderTableData = (data, index) => {
  console.log(data);
  return (
    <Table.Row key={index}>
      <Table.Cell>{data}</Table.Cell>
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
        color='yellow'
        >
        <Table.Header>
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
        </Table.Header>

        <Table.Body>
            {
              courseSections['1']['LECT'].map((entry) => {
                return (
                  <Table.Row key={entry['Section Number']}>
                    <Table.Cell><Checkbox defaultChecked={true} /></Table.Cell>
                    <Table.Cell>{`${entry['Section Number']} ${entry['Course Component']}`}</Table.Cell>
                    <Table.Cell>{entry['CRN']}</Table.Cell>
                    <Table.Cell>{`${entry['Start Time']}-${entry['End Time']}`}</Table.Cell>
                    <Table.Cell>{entry['Days']}</Table.Cell>
                    <Table.Cell>{entry['Location']}</Table.Cell>
                    <Table.Cell>{entry['Instructor']}</Table.Cell>
                    <Table.Cell>{entry['Units']}</Table.Cell>
                    <Table.Cell>{`${entry['Act Enrl']}/${entry['Max Enrl']}`}</Table.Cell>
                  </Table.Row>
                );
              })
            }

        </Table.Body>
      </Table>
      <br></br>
      <Table
        headerRow={renderHeaderRow()}
        renderBodyRow={renderTableData} // this will map over tableData
        tableData={sampleData}
      >
      </Table>
      {/* Want to render a table here, maybe create a table component? */}
      {console.log('table:')}
    </div>
  );
};

export default SectionsTable;
