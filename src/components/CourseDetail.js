import React from 'react';
import ReactDOM from 'react-dom';
import SectionsTable from './SectionsTable';
import { extractSections } from '../lib/ExtractSections';
import axios from 'axios';
// no state in this component, so it's gonna be a stateless functional component.

const sampleData = ['data1': 99, 'data2': 123, 'data3': 349832];
const BASE_URL = `https://cse120-course-planner.herokuapp.com/api/courses/course-match/`;

class CourseDetail extends React.Component {

  componentWillMount() {

  }

  state = {
    sectionsOneCourse: undefined,
    course: '',
  }

  postRequestDataExtractor = (courseData) => {
    // return an object of sections like so: (NOTE: MAIN COMPONENT MUST GO FIRST)
    // {
    //   "1": [LECT, LAB, etc.],
    //   "2": [LECT, LAB, etc.]
    // }
    console.log("want to parse this data: ", courseData);
    let output = {};
    // first, initalize main components
    for (let i = 0; i < courseData.length; i++) {
      console.log("lecture crn: ", courseData[i]['lecture_crn']);
      if (courseData[i]['lecture_crn'] === null) {
        // initalize section array
        output[courseData[i]['crn']] = [];
        output[courseData[i]['crn']].push(courseData[i]);
      }
    }

    // loop again, this time, add disc/lab to proper lecture crn
    for (let j = 0; j < courseData.length; j++) {
      if (courseData[j]['lecture_crn'] !== null) {
        output[[courseData[j]['lecture_crn']]].push(courseData[j]);
      }
    }
    console.log("output after initialization: ", output);
    return output;
  }

  fetchCourseData = (course) => {
    let sections = this.state.sectionsOneCourse;

    let data = JSON.stringify({
        course_list: [course],
        term: "201830"
    });

    axios.post(BASE_URL, data, {
        headers: {
            'Authorization': `Basic ${btoa("admin:course-planner")}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
      const data = res.data[course];
      console.log("(POST) inside add course sections: ", data);
      let sectionsObj = this.postRequestDataExtractor(data);
      sections = sectionsObj;
      console.log("SECTIONS: ", sectionsObj);
      this.setState(() => ({ sectionsOneCourse: sections, course: course }));
    })
    .catch(error => {
      console.log(error);
    });
  };

  buildSectionsList = (keys) => {

    // put all sections into array for table rows.  Maybe sort by discussion number??

    const sections = this.state.sectionsOneCourse;
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

    if (!this.state.sectionsOneCourse || this.state.course !== this.props.course) {
      this.fetchCourseData(this.props.course);
      return <div className="course-detail__container">Loading...</div>;
    }
    const keys = Object.keys(this.state.sectionsOneCourse);
    const tempList = this.state.sectionsOneCourse[keys[0]];
    const courseInfo = tempList[0];
    const sectionsList = this.buildSectionsList(keys);
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
