import React from 'react';
import ReactDOM from 'react-dom';
import SectionsTable from './SectionsTable';

// no state in this component, so it's gonna be a stateless functional component.

const sampleData = ['data1': 99, 'data2': 123, 'data3': 349832];

const extractSections = (sectionsObj) => {
  // all we are doing here is parsing the JSON data
  // return an array of all sections, with LECT first
  let output = [];
  const sections = Object.keys(sectionsObj);

  // get keys as array
  for (let i = 0; i < sections.length; i++) {
    // get section types as keys array (LECT, DISC, LAB, etc.)
    let sectionTypesList = Object.keys(sectionsObj[sections[i]]);
    // loop through section types
    for (let j = 0; j < sectionTypesList.length; j++) {
      // get current section type
      let sectionType = sectionTypesList[j];
      // get entire list of this section type, for ex. LECT will yield all elements in JSON array for LECT
      let sectionsList = sectionsObj[sections[i]][sectionTypesList[j]];
      // loop through that list, appending to output
      for (let k = 0; k < sectionsList.length; k++) {
        // append to output array
        //console.log(sectionsList[k]);
        output.push(sectionsList[k]);
      }
    }
  }
  return output
};

const CourseDetail = (props) => {
  const dept = props.department;
  const course = props.course;
  const courseInfo = window.jsonData[dept][course]['info'];
  const courseSections = window.jsonData[dept][course]['sections'];
  const sectionsList = extractSections(courseSections);
  //console.log("output of extractSections: ", sectionsList);
  return (
    <div>
      <h1>{`${courseInfo['Course Number']} - ${courseInfo['Course Title']}`}</h1>
      <h4>Choose which sections you want us to pick when creating your schedule :)</h4>
      <SectionsTable
        department={dept}
        course={course}
        sectionsList={sectionsList}
      />
    </div>
  );
};


export default CourseDetail;
