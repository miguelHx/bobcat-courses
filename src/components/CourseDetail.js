import React from 'react';
import ReactDOM from 'react-dom';
import SectionsTable from './SectionsTable';

// no state in this component, so it's gonna be a stateless functional component.

const sampleData = ['data1': 99, 'data2': 123, 'data3': 349832];

const CourseDetail = (props) => {
  const dept = props.department;
  const course = props.course;
  const courseInfo = window.jsonData[dept][course]['info'];
  const courseSections = window.jsonData[dept][course]['sections'];

  return (
    <div>
      <h1>{`${courseInfo['Course Number']} - ${courseInfo['Course Title']}`}</h1>
      <h4>Choose which sections you want us to pick when creating your schedule :)</h4>
      <SectionsTable
        department={dept}
        course={course}
      />
    </div>
  );
};


export default CourseDetail;
