import React from 'react';
import SectionsTable from './SectionsTable';

const buildSectionsList = (keys, sections) => {
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
};

const CourseDetail = (props) => {
  const { sections, selectedCourse } = props;
  if (!sections[selectedCourse]) {
    return <div className="course-detail__container">Loading...</div>;
  }
  const keys = Object.keys(sections[selectedCourse]);
  const tempList = sections[selectedCourse][keys[0]];
  const courseInfo = tempList[0];
  const sectionsList = buildSectionsList(keys, sections[selectedCourse]);
  return (
    <div className="course-detail__container">
      <div className="course-detail__header-text">
        <h3>{`${courseInfo['simple_name']} - ${courseInfo['course_name']}`}</h3>
        <p>Choose which sections you want us to pick when creating your schedule.</p>
      </div>
      <SectionsTable
        course={selectedCourse}
        sectionsList={sectionsList} // instead of passing in sectionsList, pass in state from root component
        updateSectionCheckboxToggle={props.updateSectionCheckboxToggle}
      />
    </div>
  );
};

export default CourseDetail;
