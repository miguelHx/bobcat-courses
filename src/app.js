import React from 'react';
import ReactDOM from 'react-dom';
import CourseDetail from './components/CourseDetail';
import CourseSelector from './components/CourseSelector';
import Schedules from './components/Schedules';
import courseJSON from './../data/courses_sample_data.json';
import extractSections from './lib/ExtractSections';
import 'semantic-ui-css/semantic.min.css';
import './styles/styles.scss';


const initialSectionsExtract = (courseData) => {
  console.log("Course Data: ", courseData);
  let output = {};
  // build new structure of selectedSections
  // MAIN COMPONENT MUST BE FIRST INDEX OF SECTION # ARRAY
  const mainSection = courseData['info']['Main Section']; // LECT, or SEM, or...
  const linkedSections = courseData['info']['Linked Sections']; // ['DISC', 'LAB', etc.]
  const sectionKeys = Object.keys(courseData['sections']);

  for (let i = 0; i < sectionKeys.length; i++) {
    let sectionIndex = sectionKeys[i];
    output[sectionIndex] = [];
    // get main component first, put in array
    let mainSectionObj = courseData['sections'][sectionIndex][mainSection][0];
    mainSectionObj["isSelected"] = true; // by default, everything is selected
    mainSectionObj["isRowDisabled"] = false;
    mainSectionObj["Linked Sections"] = linkedSections;
    mainSectionObj["isMainComponent"] = true;

    output[sectionIndex].push(mainSectionObj);

    // now, want to push each linked component, the size of
    // linkedSections will be AT MOST 2, for when we link DISC and LAB
    let currSectionType = linkedSections[0];
    let sectionsList = courseData['sections'][sectionIndex][currSectionType];
    for (let k = 0; k < sectionsList.length; k++) {

      // TODO
      // take into account linked DISC with LAB
      // could just be an if statement that organizes the array differently.
      let currSectionObj = sectionsList[k];
      // set up default properties
      currSectionObj["isSelected"] = true;
      currSectionObj["isRowDisabled"] = false;
      currSectionObj["isMainComponent"] = false;
      output[sectionIndex].push(currSectionObj);
    }
  }
  return output;
}




class AppRoot extends React.Component {
  state = {
    selectedDepartment: undefined,
    selectedCourse: undefined, // for course detail table
    selectedSections: {}, // for algorithm, must be in same format at table row
    validSchedules: [], // for calendars
  };

  componentWillMount() {

    console.log("in the root app component, want to load JSON data here.");
    console.log("this function will execute before render() is called.");

    //initialize data
    console.log("comp. mounted.  Want to get json data and store either locally (for development) or through an AJAX request (production).");
    window.jsonData = courseJSON;
    const departments = Object.keys(window.jsonData);
    const courses = Object.keys(window.jsonData[departments[0]]);

    const courseData = window.jsonData[departments[0]][courses[0]];
    console.log("Course data:");
    console.log(courseData);

    //const jsonObj = JSON.parse(courseJSON);
    console.log("JSON file: ");
    console.log(window.jsonData);
    //console.log(jsonObj);
    console.log("Printing out main keys from JSON file:");
    console.log(departments);
    console.log("printing out courses from Anthropology");
    console.log(courses);

    //this.setState(() => ({ selectedDepartment: departments[0] }));
  }

  updateSelectedDept = (dept) => {
    this.setState(() => ({ selectedDepartment: dept }));
  };

  updateSelectedCourse = (course) => {
    this.setState(() => ({ selectedCourse: course }));
  };

  updateSectionCheckboxToggle = (sectionNumber) => {
    // format changed, so need to update to reflect that.
    // if MAIN component was unchecked, then we want to uncheck the rest of the sections in that particular section
    const course = this.state.selectedCourse;
    let sections = this.state.selectedSections; // accessing object with key as sections mapping to array
    const sectionKeys = Object.keys(sections[course]);

    for (let i = 0; i < sectionKeys.length; i++) {
      let sectionIndex = sectionKeys[i];
      let sectionsList = sections[course][sectionIndex];
      console.log("sections list: ", sectionsList);
      for (let j = 0; j < sectionsList.length; j++) {
        let currSection = sectionsList[j];
        let checked = currSection['isSelected'];
        if (currSection['Section Number'] === sectionNumber) {
          // toggle checked
          sections[course][sectionIndex][j]['isSelected'] = !checked;
        }
      }
    }
    this.setState(() => ({ selectedSections: sections }));

  };

  addCourseSections = (dept, course) => {
    const courseData = window.jsonData[dept][course];
    let sections = this.state.selectedSections;
    // want to extract original sections AND initialize info about MAIN and connected components, etc.
    const initialSectionData = initialSectionsExtract(courseData);
    // update state by adding new key-value pair
    sections[course] = initialSectionData;
    this.setState(() => ({ selectedSections: sections }));
  };

  deleteCourseFromSelectedSections = (course) => {
    let selSections = this.state.selectedSections;
    delete selSections[course];
    this.setState(() => ({ selectedSections: selSections }));
  };

  deleteAllSelectedSections = () => {
    this.setState(() => ({ selectedSections: {} }));
  };

  // add two more functions to clearSelectedCourse and clearSelectedDept
  clearSelectedDept = () => {
    this.setState(() => ({ selectedDepartment: undefined }));
  };

  clearSelectedCourse = () => {
    this.setState(() => ({ selectedCourse: undefined }));
  };

  generateSchedules = () => {
    // Should we build the graph here???
    // so the graph would be built here, and then used for the algorithm to find valid schedules.
    console.log("IN ROOT COMPONENT");
    console.log("Want to first check size of courses array.");
    console.log("Take courses, use courses array to get information from JSON, run algorithm.");
    console.log("Decide what data we want to use to run the algorithm.");
    console.log("Store result of algo in some sort of data structure, to be used by the Calendar component");
  };


  render() {
    // only render course detail if a course is selected
    // only render calendar component if valid schedules has size > 0
    // if generate schedules is ran, but there is a conflict, then
    // notify user and reset state
    const selectedDepartment = this.state.selectedDepartment;
    const selectedCourse = this.state.selectedCourse;
    const validSchedules = this.state.validSchedules;
    const selectedSections = this.state.selectedSections;
    console.log(this.state);
    return (
      <div>
        {/* header component will replace h1 below */}
        <h1>Bobcat Courses</h1>
        <p>Selected Department (in root comp.): {this.state.selectedDepartment}</p>
        <p>Selected Course (in root comp.): {this.state.selectedCourse}</p>
        <CourseSelector
          selectedDepartment={selectedDepartment}
          selectedCourse={selectedCourse}
          updateSelectedDept={this.updateSelectedDept}
          updateSelectedCourse={this.updateSelectedCourse}
          addCourseSections={this.addCourseSections}
          clearSelectedDept={this.clearSelectedDept}
          clearSelectedCourse={this.clearSelectedCourse}
          deleteCourseFromSelectedSections={this.deleteCourseFromSelectedSections}
          deleteAllSelectedSections={this.deleteAllSelectedSections}
          generateSchedules={this.generateSchedules}
        />
        {
          selectedCourse &&
          <CourseDetail
            department={selectedDepartment}
            course={selectedCourse}
            selectedSections={selectedSections}
            updateSectionCheckboxToggle={this.updateSectionCheckboxToggle}
          />
        }
        {
          // don't render calendars unless both conditions inside () are true
          // note: selectedCourse must get reset to undefined when running
          // the algorithm
          (validSchedules.length > 0 && selectedCourse === undefined)
           && <Schedules />
        }
        {/* footer component will go here */}
      </div>
    );
  }
}



ReactDOM.render(<AppRoot />, document.getElementById('app'));
