import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CourseDetail from './components/CourseDetail';
import CourseSelector from './components/CourseSelector';
import Header from './components/Header';
import Schedules from './components/Schedules';
import courseJSON from './../data/courses_sample_data.json';
import deptJSON from './../data/departments_FA18.json';
import 'semantic-ui-css/semantic.min.css';
import './styles/styles.scss';

// TODO - fetch data from this component in addCourseSections.  After data is fetched, update the selectedCourse so that the course detail can render.
// * in the course Detail first check if selected course is inside sections array.  Should be there tho since course detail won't render unless
// data is fetched AND selectedCourse is there.
const BASE_URL = `https://cse120-course-planner.herokuapp.com/api/courses/course-match/`;


// comparator used for sorting array of objects
const compareSections = (me, other) => {
  let mySectNum = me['course_id'].split('-')[2];
  let otherSectNum = other['course_id'].split('-')[2];
  if (mySectNum < otherSectNum)
    return -1;
  if (mySectNum > otherSectNum)
    return 1;
  return 0;
}


class AppRoot extends React.Component {
  state = {
    selectedDepartment: undefined,
    selectedCourse: undefined, // for course detail table
    sections: {}, // for algorithm, must be in same format as table row
    validSchedules: [], // for calendars
  };

  componentWillMount() {
    window.deptList = deptJSON;
  }

  updateSelectedDept = (dept) => {
    this.setState(() => ({ selectedDepartment: dept }));
  };

  updateSelectedCourse = (course) => {
    this.setState(() => ({ selectedCourse: course }));
  };

  updateSectionCheckboxToggle = (sectionNumber) => {

    // loop through sections of selectedCourse
    let sections = this.state.sections;
    const course = this.state.selectedCourse;
    const sectionKeys = Object.keys(sections[course]);


    console.log(sectionKeys);
    console.log(sections[course]);

    for (let i = 0; i < sectionKeys.length; i++) {
      let currSectionKey = sectionKeys[i];
      let sectionsList = sections[course][currSectionKey];

      // case when we have one standalone section
      if (sectionsList.length === 1) {

        let currSectNum = sectionsList[0]['course_id'].split('-')[2];
        if (currSectNum === sectionNumber) {
          let checked = sectionsList[0]['isSelected'];
          sections[course][currSectionKey][0]['isSelected'] = !checked;
          break;
        }
      }

      for (let j = 0; j < sectionsList.length; j++) {
        let currSectionNumber = sectionsList[j]['course_id'].split('-')[2];
        let checked = sectionsList[j]['isSelected'];
        if (currSectionNumber !== sectionNumber) {
          // go to next iteration of this for loop
          continue;
        }
        if (j !== 0) {
          // just toggle check, we have a regular section
          sections[course][currSectionKey][j]['isSelected'] = !checked;
          continue;
        }
        sections[course][currSectionKey][j]['isSelected'] = !checked;
        for (let k = j + 1; k < sectionsList.length; k++) {
          let rowDisabled = sectionsList[k]['isRowDisabled'];
          let selected = sectionsList[k]['isSelected'];
          sections[course][currSectionKey][k]['isRowDisabled'] = !rowDisabled;
          sections[course][currSectionKey][k]['isSelected'] = !selected;
        }
      }
    }
    this.setState(() => ({ sections: sections }));

    // format changed, so need to update to reflect that.
    // if MAIN component was unchecked, then we want to uncheck the rest of the sections in that particular section
    // const course = this.state.selectedCourse;
    // let sections = this.state.sections; // accessing object with key as sections mapping to array
    // const sectionKeys = Object.keys(sections[course]);
    //
    // for (let i = 0; i < sectionKeys.length; i++) {
    //   let sectionIndex = sectionKeys[i];
    //   let sectionsList = sections[course][sectionIndex];
    //   console.log("sections list: ", sectionsList);
    //   for (let j = 0; j < sectionsList.length; j++) {
    //     let currSection = sectionsList[j];
    //     let checked = currSection['isSelected'];
    //
    //     if (currSection['Section Number'] !== sectionNumber) {
    //       // go on to next iteration
    //       continue;
    //     }
    //     if (!currSection['isMainComponent']) {
    //       // toggle checked
    //       sections[course][sectionIndex][j]['isSelected'] = !checked;
    //     }
    //     else {
    //       // otherwise, this section is a main component, then flip boolean of linked sections
    //       // uncheck MAIN component and deselect as well as disable the other rows
    //       sections[course][sectionIndex][j]['isSelected'] = !checked;
    //       // deselect all other components and disable the rows
    //       for (let k = j+1; k < sectionsList.length; k++) {
    //         let rowDisabled = sectionsList[k]['isRowDisabled'];
    //         let selected = sectionsList[k]['isSelected'];
    //         sections[course][sectionIndex][k]['isRowDisabled'] = !rowDisabled;
    //         sections[course][sectionIndex][k]['isSelected'] = !selected;
    //       }
    //       // done, no need to check other ones
    //       break;
    //     }
    //
    //   }
    // }
    // this.setState(() => ({ sections: sections }));

  };

  indexOfLecture = (courseData) => {
    for(let k = 0; k < courseData.length; k++) {
      if(courseData[k].type === 'LECT') {
        return k;
      }
    }
    return -1;
  };

  postRequestDataExtractor = (courseData) => {
    // return an object of sections like so: (NOTE: MAIN COMPONENT MUST GO FIRST)
    // {
    //   "1": [LECT, LAB, etc.],
    //   "2": [LECT, LAB, etc.]
    // }
    console.log("want to parse this data: ", courseData);
    // first, sort the course data
    courseData.sort(compareSections);

    let output = {};

    let lectIndex = this.indexOfLecture(courseData);
    if (lectIndex === -1) {
      // no lectures, must be standalone course.
      for (let k = 0; k < courseData.length; k++) {
        courseData[k]["isSelected"] = true; // by default, everything is selected
        courseData[k]["isRowDisabled"] = false;
        output[courseData[k]['crn']] = [];
        output[courseData[k]['crn']].push(courseData[k]);
      }
      // sort the list here
      return output;
    }

    // first, initalize main components
    for (let i = 0; i < courseData.length; i++) {
      console.log("lecture crn: ", courseData[i]['lecture_crn']);
      if (courseData[i]['lecture_crn'] === null) {
        // initalize section array
        courseData[i]["isSelected"] = true; // by default, everything is selected
        courseData[i]["isRowDisabled"] = false;
        output[courseData[i]['crn']] = [];
        output[courseData[i]['crn']].push(courseData[i]);
      }
    }

    // loop again, this time, add disc/lab to proper lecture crn
    for (let j = 0; j < courseData.length; j++) {
      if (courseData[j]['lecture_crn'] !== null) {
        courseData[j]["isSelected"] = true;
        courseData[j]["isRowDisabled"] = false;
        output[[courseData[j]['lecture_crn']]].push(courseData[j]);
      }
    }
    console.log("[ROOT] output after initialization : ", output);
    return output;
  }

  fetchCourseData = (course) => {
    let sections = this.state.sections;

    let data = JSON.stringify({
        course_list: [course],
        term: "201830"
    });

    axios.post(BASE_URL, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
      const data = res.data[course];
      console.log("(POST) inside add course sections: ", data);
      let sectionsObj = this.postRequestDataExtractor(data);
      sections[course] = sectionsObj;
      console.log("SECTIONS (IN ROOT): ", sections);
      this.setState(() => ({ sections: sections }));
    })
    .catch(error => {
      console.log(error);
    });
  };

  addCourseSections = (course) => {
    //const courseData = window.jsonData[dept][course];
    /*
    sections: {
      "CSE-005": {
        "1": [LECT, LAB, LAB, LAB, etc.],
        "2": [LECT, LAB, LAB, LAB, etc.]
      },
      "ANTH-001": {
        "1": [LECT, DISC, DISC, DISC, etc.],
        "2": [LECT, DISC, DISC, DISC, etc.]
      }
    }
    */
    this.fetchCourseData(course);
    //this.setState(() => ({ selectedCourse: course }));
    //this.setState(() => ({ sections: sections }));
    // if we fetch the sections here, and pass it to the course detail than we can keep track of
    // the selected state easier
    // don't select course until course data is loaded

  };

  deleteCourseFromSections = (course) => {
    let selSections = this.state.sections;
    delete selSections[course];
    this.setState(() => ({ sections: selSections }));
  };

  deleteAllSections = () => {
    this.setState(() => ({ sections: {} }));
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
    this.clearSelectedCourse();
    this.setState(() => ({ validSchedules: 'test' }));
  };


  render() {
    // only render course detail if a course is selected
    // only render calendar component if valid schedules has size > 0
    // if generate schedules is ran, but there is a conflict, then
    // notify user and reset state
    const selectedDepartment = this.state.selectedDepartment;
    const selectedCourse = this.state.selectedCourse;
    const validSchedules = this.state.validSchedules;
    const sectionKeys = Object.keys(this.state.sections);
    //console.log("KEYS: ", sectionKeys);
    console.log("STATE: ", this.state);
    return (
      <div>
        <Header />
        {/* <p>Selected Department (in root comp.): {this.state.selectedDepartment}</p>
        <p>Selected Course (in root comp.): {this.state.selectedCourse}</p> */}
        <div className="main-container">
          <CourseSelector
            selectedDepartment={selectedDepartment}
            selectedCourse={selectedCourse}
            updateSelectedDept={this.updateSelectedDept}
            updateSelectedCourse={this.updateSelectedCourse}
            addCourseSections={this.addCourseSections}
            clearSelectedDept={this.clearSelectedDept}
            clearSelectedCourse={this.clearSelectedCourse}
            deleteCourseFromSections={this.deleteCourseFromSections}
            deleteAllSections={this.deleteAllSections}
            generateSchedules={this.generateSchedules}
          />
          {
            (selectedCourse) &&
            <CourseDetail
              department={selectedDepartment}
              course={selectedCourse}
              updateSectionCheckboxToggle={this.updateSectionCheckboxToggle}
              sections={this.state.sections}
            />
          }
          { selectedCourse === undefined &&
            <div className="app-root__schedules-title-wrapper">
              <h3>Schedules</h3>
              {
                // don't render calendars unless both conditions inside () are true
                // note: selectedCourse must get reset to undefined when running
                // the algorithm
                 (validSchedules.length > 0 && selectedCourse === undefined) &&
                <Schedules
                  validSchedules={validSchedules}
                />
              }
            </div>
          }
          {/* footer component will go here */}
        </div>
      </div>
    );
  }
}



ReactDOM.render(<AppRoot />, document.getElementById('app'));
