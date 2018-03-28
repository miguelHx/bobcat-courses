import React from 'react';
import ReactDOM from 'react-dom';

import { Table } from 'semantic-ui-react';

class CourseDetail extends React.Component {
  render() {
    const dept = this.props.department;
    const course = this.props.course;
    const courseInfo = window.jsonData[dept][course]['info'];
    const courseSections = window.jsonData[dept][course]['sections'];

    console.log("Dept and Course from persp. of CourseDetail:");
    console.log(dept, course);
    console.log("Course sections: ", courseSections);
    return (
      <div>
        <h1>{`${courseInfo['Course Number']} - ${courseInfo['Course Title']}`}</h1>
        <h4>Choose which courses you want us to pick when creating your schedule :)</h4>
        <Table striped>
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
                courseSections['1']['DISC'].map((entry) => {
                  console.log(entry);
                  return (
                    <Table.Row key={entry['Section Number']}>
                      <Table.Cell>Checkbox</Table.Cell>
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
        {/* Want to render a table here, maybe create a table component? */}
      </div>
    );
  }
}


export default CourseDetail;
