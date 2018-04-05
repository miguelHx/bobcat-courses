import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox, Table } from 'semantic-ui-react';



class SectionsTable extends React.Component {

  renderHeaderRow = () => {
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
        {/* <Table.HeaderCell>Enrolled</Table.HeaderCell> */}
      </Table.Row>
    );
  };

  renderTableData = (data, index) => {
    // want number of rows to equal number of LECT sections + number of DISC sections + number of XXXX sections
    // so each element in data array must have each element inside each sections array
    const courseSectionNumber = data['course_id'].split('-')[2]; // ANTH-001-01 -> 01
    return (
      <Table.Row key={index} disabled={data['isRowDisabled']}>
        <Table.Cell>
          <Checkbox
            id={courseSectionNumber}
            // checked={data['isSelected']}
            checked={true}
            onChange={this.handleCheckboxChange}
          />
        </Table.Cell>
        <Table.Cell>{`${courseSectionNumber} ${data['type']}`}</Table.Cell>
        <Table.Cell>{data['crn']}</Table.Cell>
        <Table.Cell>{data['hours']}</Table.Cell>
        <Table.Cell>{data['days']}</Table.Cell>
        <Table.Cell>{data['room']}</Table.Cell>
        <Table.Cell>{data['instructor']}</Table.Cell>
        <Table.Cell>{data['units']}</Table.Cell>
        {/* <Table.Cell>{`${data['Act Enrl']}/${data['Max Enrl']}`}</Table.Cell> */}
      </Table.Row>
    );
  };


  handleCheckboxChange = (event, data) => {
    const sectionNum = data.id;
    // want to update state of section to change isSelected boolean in root app state
    // call handler to update selected courses state
    this.props.updateSectionCheckboxToggle(sectionNum);
  };

  render() {
    return (
      <div>
        <Table
          striped
          unstackable
          headerRow={this.renderHeaderRow()}
          renderBodyRow={this.renderTableData} // this will map over tableData
          tableData={this.props.sectionsList}
          collapsing={true}
          selectable={true}
          color='blue'
          compact='very'
        >
        </Table>
      </div>
    );
  }
}

export default SectionsTable;
