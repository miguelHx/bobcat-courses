import React from 'react';
import { Checkbox, Table } from 'semantic-ui-react';
import './SectionsTable.css';
import SectionsTableHeader from "./SectionsTableHeader";

export default class SectionsTable extends React.Component {

  renderTableData = (data, index) => {
    // want number of rows to equal number of LECT sections + number of DISC sections + number of XXXX sections
    // so each element in data array must have each element inside each sections array
    const courseSectionNumber = data['course_id'].split('-')[2]; // ANTH-001-01 -> 01
    return (
      <Table.Row key={index} disabled={data['isRowDisabled']}>
        <Table.Cell>
          <Checkbox
            id={courseSectionNumber}
            checked={data['isSelected']}
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
        <Table.Cell>{`${data['enrolled']}/${data['capacity']}`}</Table.Cell>
      </Table.Row>
    );
  };

  // TODO re-evaluate how to take care of filtering
  handleCheckboxChange = (event, data) => {
    const sectionNum = data.id;
    // want to update state of section to change isSelected boolean in root app state
    // call handler to update selected courses state
    this.props.updateSectionCheckboxToggle(sectionNum); // this is preventing us from using the table as a stateless functional component.
  };

  render() {
    return (
      <div className="sections-table">
        <Table
          headerRow={ <SectionsTableHeader /> }
          renderBodyRow={this.renderTableData} // this will map over tableData
          tableData={this.props.sectionsList}
          selectable={true}
          collapsing={true}
          compact='very'
          unstackable
        >
        </Table>
      </div>
    );
  }
}