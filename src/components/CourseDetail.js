import React from 'react';
import ReactDOM from 'react-dom';
import SectionsTable from './SectionsTable';
import { extractSections } from '../lib/ExtractSections';
import axios from 'axios';
// no state in this component, so it's gonna be a stateless functional component.
// changed to a class, but probably gonna change back to stateless functional component

class CourseDetail extends React.Component {

  buildSectionsList = (keys, sections) => {

    // put all sections into array for table rows.  Maybe sort by discussion number??

    let output = [];
    for (let i = 0; i < keys.length; i++) {
      let currKey = keys[i];
      let currSectionList = sections[currKey];
      for (let j = 0; j < currSectionList.length; j++) {
        output.push(currSectionList[j]);
      }
    }
    return output;
  }

  render() {

    // if (!this.state.sectionsOneCourse || this.state.course !== this.props.course) {
    //   this.fetchCourseData(this.props.course);
    //   return <div className="course-detail__container">Loading...</div>;
    // }
    const selectedCourse = this.props.course;
    const sections = this.props.sections;
    if (!sections[selectedCourse]) {
      return <div className="course-detail__container">Loading...</div>;
    }
    const keys = Object.keys(sections[selectedCourse]);
    const tempList = sections[selectedCourse][keys[0]];
    const courseInfo = tempList[0];
    //const sectionsList = this.buildSectionsList(keys);
    const sectionsList = this.buildSectionsList(keys, sections[selectedCourse]);
    return (
      <div className="course-detail__container">
        <div className="course-detail__header-text">
          <h3>{`${courseInfo['simple_name']} - ${courseInfo['course_name']}`}</h3>
          <p>Choose which sections you want us to pick when creating your schedule.</p>
        </div>
        <SectionsTable
          course={this.props.course}
          sectionsList={sectionsList} // instead of passing in sectionsList, pass in state from root component
          updateSectionCheckboxToggle={this.props.updateSectionCheckboxToggle}
        />
      </div>
    );
  }

}


export default CourseDetail;
