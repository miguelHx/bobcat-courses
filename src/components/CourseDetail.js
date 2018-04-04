import React from 'react';
import ReactDOM from 'react-dom';
import SectionsTable from './SectionsTable';
import { extractSections } from '../lib/ExtractSections';

// no state in this component, so it's gonna be a stateless functional component.

const sampleData = ['data1': 99, 'data2': 123, 'data3': 349832];

const CourseDetail = (props) => {
  const dept = props.department;
  const course = props.course;
  const key = Object.keys(props.sections[course])[0];
  console.log(key);
  const courseInfo = props.sections
  // sections list will contains sections of selected course from root state
  const sectionsList = [];
  //console.log("output of extractSections: ", sectionsList);
  return (
    <div className="course-detail__container">
      <div className="course-detail__header-text">
        {/* <h3>{`${courseInfo['Course Number']} - ${courseInfo['Course Title']}`}</h3> */}
        <p>Choose which sections you want us to pick when creating your schedule :)</p>
      </div>
      <SectionsTable
        department={dept}
        course={course}
        sectionsList={sectionsList} // instead of passing in sectionsList, pass in state from root component
        updateSectionCheckboxToggle={props.updateSectionCheckboxToggle}
      />
    </div>
  );
};


export default CourseDetail;
