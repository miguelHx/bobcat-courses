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
    return (
      <Table.Row key={index} disabled={data['isRowDisabled']}>
        <Table.Cell>
          <Checkbox
            // this is genius
            id={data['Section Number']}
            checked={data['isSelected']}
            onChange={this.handleCheckboxChange}
          />
        </Table.Cell>
        <Table.Cell>{`${data['Section Number']} ${data['Course Component']}`}</Table.Cell>
        <Table.Cell>{data['CRN']}</Table.Cell>
        <Table.Cell>{`${data['Start Time']}-${data['End Time']}`}</Table.Cell>
        <Table.Cell>{data['Days']}</Table.Cell>
        <Table.Cell>{data['Location']}</Table.Cell>
        <Table.Cell>{data['Instructor']}</Table.Cell>
        <Table.Cell>{data['Units']}</Table.Cell>
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
