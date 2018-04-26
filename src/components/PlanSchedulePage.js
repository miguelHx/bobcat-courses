import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CourseDetail from '../components/CourseDetail';
import CourseSelector from '../components/CourseSelector';
import Header from '../components/Header';
import { Message, Button } from 'semantic-ui-react';
import SaveScheduleButton from './SaveScheduleButton';
import Schedules from '../components/Schedules';
import courseJSON from '../../data/courses_sample_data.json';
import deptJSON from '../../data/departments_FA18.json';
import { extractSectionsFromSchedule } from '../lib/WeeklyCalendarUtils';
import { extractSections } from '../lib/ExtractSections';
import AuthService from './AuthService';

const Auth = new AuthService();

// TODO - fetch data from this component in addCourseSections.  After data is fetched, update the selectedCourse so that the course detail can render.
// * in the course Detail first check if selected course is inside sections array.  Should be there tho since course detail won't render unless
// data is fetched AND selectedCourse is there.
const BASE_URL = 'https://cse120-course-planner.herokuapp.com/api';

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


class PlanSchedulePage extends React.Component {
  state = {
    selectedDepartment: undefined,
    selectedCourse: undefined, // for course detail table
    sections: {}, // for algorithm, must be in same format as table row
    currSchedule: {},
    currScheduleIndex: 0,
    validSchedules: [], // for calendars
    error: undefined, // for when we have conflicting schedules.
  };

  componentWillMount() {
    window.deptList = deptJSON;
  }

  updateSelectedDept = (dept) => {
    this.setState(() => ({ selectedDepartment: dept, error: undefined, validSchedules: [] }));
  };

  updateSelectedCourse = (course) => {
    this.setState(() => ({ selectedCourse: course, error: undefined, validSchedules: [] }));
  };

  updateSectionCheckboxToggle = (sectionNumber) => {
    // loop through sections of selectedCourse
    let sections = this.state.sections;
    const course = this.state.selectedCourse;
    const sectionKeys = Object.keys(sections[course]);

    for (let i = 0; i < sectionKeys.length; i++) {
      let currSectionKey = sectionKeys[i];
      let sectionsList = sections[course][currSectionKey];

      // case when we have one standalone section, i.e. WRI-1
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
        // general case.
        if (j !== 0) {
          // just toggle check, we have a regular section
          sections[course][currSectionKey][j]['isSelected'] = !checked;
          // also toggle linked section, for ex. DISC and LAB
          if (sections[course][currSectionKey][j]['attached_crn']) {
            let attachedCRN = sections[course][currSectionKey][j]['attached_crn'];
            if (!checked) {
              // extra check, want to enable other section if it is disabled.
              for (let x = 0; x < sectionsList.length; x++) {
                if (sectionsList[x]['crn'] === attachedCRN) {
                  if (sectionsList[x]['isRowDisabled']) {
                    sections[course][currSectionKey][x]['isSelected'] = true;
                    break;
                  }
                  else {
                    sections[course][currSectionKey][x]['isSelected'] = true;
                  }
                }
              }

              // if current one is NOT checked, then when we check it,
              // we want to ALSO check the other one, since they are linked

              // in other words, leave it alone.
              continue;
            }
            // other case, if checked to unchecked AND other one is disabled, want enable it
            // uncheck  that one also
            // first search for it
            let attachedSection = {};
            for (let idx = 0; idx < sectionsList.length; idx++) {
              if (sectionsList[idx]['crn'] == attachedCRN) {
                let rowStatus = sectionsList[idx]['isRowDisabled'];
                sections[course][currSectionKey][idx]['isSelected'] = false;
              }
            }
          }
          continue;
        }

        // case where main section type is checked, i.e. LECT
        sections[course][currSectionKey][j]['isSelected'] = !checked;
        for (let k = j + 1; k < sectionsList.length; k++) {
          let rowDisabled = sectionsList[k]['isRowDisabled'];
          if (checked) {
            // from checked to unchecked, disable and de-select all rows
            sections[course][currSectionKey][k]['isRowDisabled'] = true;
            sections[course][currSectionKey][k]['isSelected'] = false;
          }
          else {
            // from unchecked to checked, enable all rows, also check all connected sections
            sections[course][currSectionKey][k]['isRowDisabled'] = false;
            sections[course][currSectionKey][k]['isSelected'] = true;
          }
        }
      }
    }
    this.setState(() => ({ sections: sections }));
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
    return output;
  }

  fetchCourseData = (course) => {
    let sections = this.state.sections;

    let data = JSON.stringify({
        course_list: [course],
        term: "201830",
    });

    axios.post(`${BASE_URL}/courses/course-match/`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
      const data = res.data[course];
      let sectionsObj = this.postRequestDataExtractor(data);
      sections[course] = sectionsObj;
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


  filterSectionsFromSchedules = (schedules, sections, doFilterBool) => {

    if (!doFilterBool) {
      return schedules;
    }

    let stack = []; // using stack to keep track of schedule adding
    for (let i = 0; i < schedules.length; i++) {
      let currScheduleSections = extractSectionsFromSchedule(schedules[i]);
      stack.push(schedules[i]); // push onto stack, remove when a section is NOT selected.
      // compare the currScheduleSections with sections list to check if for selection.
      let popped = false;
      for (let j = 0; j < currScheduleSections.length; j++) {
        if (popped) {
          break; // schedule thrown away, section filtered out.
        }
        let currSchedSect = currScheduleSections[j];
        let currSchedSectID = currSchedSect['course_id'];
        let courseName = currSchedSect['simple_name']; // use this for extracting proper sections array
        let sectionsList = extractSections(sections[courseName]);
        for (let k = 0; k < sectionsList.length; k++) {
          // if we have a section number match AND selected === false, then pop from stack.
          let currSect = sectionsList[k];
          let currSectID = currSect['course_id'];
          let selected = currSect['isSelected'];
          if (currSectID === currSchedSectID && !selected) {
            // pop from stack, set flag.
            stack.pop();
            popped = true;
            break; // stop searching.
          }
        }
      }
    }

    return stack;

  };


  generateSchedules = (courses) => {

    // clear previous valid sections
    if (this.state.validSchedules.length > 0) {
      this.setState(() => ({ validSchedules: [] }));
    }

    let coursesList = [];
    for (let i = 0; i < courses.length; i++) {
      coursesList.push(courses[i].name);
    }

    this.clearSelectedCourse();

    let sections = this.state.sections;
    let data = JSON.stringify({
        course_list: coursesList,
        term: "201830",
        search_full: true
    });

    axios.post(`${BASE_URL}/courses/schedule-search/`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
      let error = undefined;
      let data = res.data;

      if (data.length === 0) {
        error = 'No Valid Schedules found due to time conflicts. Please choose different courses and try again.';
      }
      else {
        data = this.filterSectionsFromSchedules(data, sections, true);
        if (data.length === 0) {
          error = 'No valid schedules found. Please select more sections and try again.';
        }
      }

      this.setState(() => ({ validSchedules: data, error: error }));
    })
    .catch(error => {
      console.log(error);
    });
  };

  saveSchedule = () => {
    let crns = [];
    const schedule = this.state.currSchedule;
    const sectionsList = extractSectionsFromSchedule(schedule);

    for (let i = 0; i < sectionsList.length; i++) {
      crns.push(sectionsList[i]['crn']);
    }

    let data = JSON.stringify({
        crns: crns,
        term: "201830",
    });

    axios.post(`${BASE_URL}/users/save-schedule/`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Auth.getToken()}`
        }
    })
    .then(res => {
      const responseStatus = res.data;
      if ('success' in responseStatus) {
        // want to notify user, return msg to SaveScheduleButton to display as a popup or alert.
        alert(responseStatus['success']);
      }
      else if ('error' in responseStatus) {
        // error, schedule probably deleted, update state error Message
        alert(responseStatus['error']);
      }
    })
    .catch(error => {
      // console.log(error);
      alert(error);
    });
  };

  updateCurrSchedule = (schedule, index) => {
    this.setState(() => ({
      currSchedule: schedule,
      currScheduleIndex: index,
    }));
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
    const { isLoggedIn } = this.props;
    return (
      <div>
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
            (selectedDepartment === undefined && selectedCourse === undefined) &&
            <div className="app-root__error-msg-wrapper">
              <Message info>
                <p>Add some courses and then press the 'Generate Schedules' button see your schedules.</p>
              </Message>
            </div>
          }
          {
            (selectedCourse) &&
            <CourseDetail
              department={selectedDepartment}
              course={selectedCourse}
              updateSectionCheckboxToggle={this.updateSectionCheckboxToggle}
              sections={this.state.sections}
            />
          }

          {
            this.state.error &&
            <div className="app-root__error-msg-wrapper">
              <Message negative>
                <p>{this.state.error}</p>
              </Message>
            </div>
          }

          { (selectedCourse === undefined && validSchedules.length > 0) &&
            <div className="app-root__schedules-title-wrapper">
              <h3 id="schedules-title__text">Schedules</h3>

              <SaveScheduleButton
                isLoggedIn={isLoggedIn}
                saveSchedule={this.saveSchedule}
              />

              {
                // don't render calendars unless both conditions inside () are true
                // note: selectedCourse must get reset to undefined when running
                // the algorithm
                <Schedules
                  validSchedules={validSchedules}
                  updateCurrSchedule={this.updateCurrSchedule}
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

export default PlanSchedulePage;
