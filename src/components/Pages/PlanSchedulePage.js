import React from 'react';
import BobcatCoursesApi from "../../api/BobcatCoursesApi";
import { connect } from 'react-redux';
import CourseDetail from '../CourseDetail/CourseDetail';
import CourseSelector from '../CourseSelector/CourseSelector';
import { extractSectionsFromSchedule } from '../../utils/WeeklyCalendarUtils';
import { extractSections } from '../../utils/ExtractSections';
import { Message, Loader } from 'semantic-ui-react';
import Schedules from '../Schedules/Schedules';
import { setCurrPlanScheduleIndex } from "../../react-redux/actions/currPlanScheduleIndex";
import { clearSelectedCourse } from "../../react-redux/actions/selectedCourse";
import { ToastContainer } from 'react-toastify';
import './PlanSchedulePage.css';

// comparator used for sorting array of objects
const compareSections = (me, other) => {
  let mySectNum = me['course_id'].split('-')[2];
  let otherSectNum = other['course_id'].split('-')[2];
  if (mySectNum < otherSectNum)
    return -1;
  if (mySectNum > otherSectNum)
    return 1;
  return 0;
};

class PlanSchedulePage extends React.Component {
  state = {
    selectedCourse: this.props.selectedCourse ? this.props.selectedCourse : '', // for course detail table
    sections: {}, // for algorithm, must be in same format as table row
    currSchedule: {},
    currPlanScheduleIndex: this.props.currPlanScheduleIndex, // redux store, default is 0
    validSchedules: [], // for calendars
    error: undefined, // for when we have conflicting schedules.
    loadingSchedules: false,
    selectedTerm: this.props.selectedTerm, // from redux, will have a term by default, never empty
  };

  componentDidMount() {
    const tempSchedules = sessionStorage.getItem("tempSchedules");
    const tempCourseInfo = sessionStorage.getItem("tempCourseInfo");
    if (tempCourseInfo !== null) {
      const parsedCI = JSON.parse(tempCourseInfo); // CI === 'course info'
      this.setState(() => ({
        sections: parsedCI.sections,
      }));
    }
    if (tempSchedules !== null) {
      this.setState(() => ({ validSchedules: JSON.parse(tempSchedules) }));
    }
  }

  componentWillMount() {
    // window.deptList = deptJSON;
  }

  componentWillUnmount() {
    // want to save valid schedules (if any) to session storage
    const { validSchedules, sections } = this.state;
    const { selectedCourse } = this.props; // getting from redux store now, so props.
    const selectedCourseInfo = {
      sections: sections,
    };
    if (validSchedules.length > 0) {
      // if schedules are here, might as well update ALL relevant state.
      sessionStorage.setItem("tempSchedules", JSON.stringify(validSchedules));
      sessionStorage.setItem("tempCourseInfo", JSON.stringify(selectedCourseInfo));
    }
    if (selectedCourse && sections[selectedCourse]) {
      sessionStorage.setItem("tempCourseInfo", JSON.stringify(selectedCourseInfo));
    }
  }

  clearValidSchedules = () => {
    this.setState(() => ({ validSchedules: [] }));
  };

  clearErrorAndValidSchedules = () => {
    this.setState(() => ({ error: undefined, validSchedules: [] }));
  };

  updateSectionCheckboxToggle = (sectionNumber) => {
    // loop through sections of selectedCourse
    let sections = this.state.sections;
    const course = this.props.selectedCourse;
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
            for (let idx = 0; idx < sectionsList.length; idx++) {
              if (sectionsList[idx]['crn'] === attachedCRN) {
                sections[course][currSectionKey][idx]['isSelected'] = false;
              }
            }
          }
          continue;
        }

        // case where main section type is checked, i.e. LECT
        sections[course][currSectionKey][j]['isSelected'] = !checked;
        for (let k = j + 1; k < sectionsList.length; k++) {
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
  };

  fetchCourseData = (course, term) => {
    let { sections } = this.state;
    let data = JSON.stringify({
        course_list: [course],
        term: term,
    });

    BobcatCoursesApi.fetchCourseData(data)
    .then(res => {
      const data = res[course];
      sections[course] = this.postRequestDataExtractor(data);
      this.setState(() => ({ sections: sections }));
    })
    .catch(error => {
      this.setState(() => ({ error: error.toString() }));
    });
  };

  addCourseSections = (course, term) => {
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
    this.fetchCourseData(course, term);
  };

  deleteCourseFromSections = (course) => {
    let selSections = this.state.sections;
    delete selSections[course];
    this.setState(() => ({ sections: selSections }));
  };

  deleteAllSections = () => {
    this.setState(() => ({ sections: {} }));
  };

  // TODO figure out an alternate way to filter, maybe using redux
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


  generateSchedules = (courses, term, days, gaps, earliest_time, latest_time) => {
    // clear previous valid sections
    this.setState(() => ({ loadingSchedules: true }));
    if (this.state.validSchedules.length > 0) {
      this.setState(() => ({ validSchedules: [] }));
    }

    let coursesList = [];
    for (let i = 0; i < courses.length; i++) {
      coursesList.push(courses[i].name);
    }

    this.props.dispatch(clearSelectedCourse());

    let sections = this.state.sections;
    let data = JSON.stringify({
      course_list: coursesList,
      filters: true,
      term: term,
      earliest_time,
      latest_time,
      gaps,
      days,
      search_full: true
    });

    BobcatCoursesApi.fetchValidSchedules(data)
    .then(res => {
      let error = undefined;
      let data = res || [];

      if (data.length === 0) {
        error = 'No Valid Schedules found due to time conflicts. Please choose different courses and try again.';
      }
      else {
        data = this.filterSectionsFromSchedules(data, sections, true);
        if (data.length === 0) {
          error = 'No valid schedules found. Please select more sections and try again.';
        }
      }
      this.props.dispatch(setCurrPlanScheduleIndex(0));
      this.setState(() => ({ validSchedules: data, error: error, loadingSchedules: false }));
    })
    .catch(error => {
      // console.log(error);
      this.setState(() => ({ loadingSchedules: false, error: 'An error has occurred.' }));
    });

  };

  updateCurrSchedule = (schedule, index) => {
    this.props.dispatch(setCurrPlanScheduleIndex(index));
    this.setState(() => ({ currSchedule: schedule }));
  };

  render() {
    const { validSchedules, error, loadingSchedules } = this.state;
    const { selectedCourse, selectedTerm, currPlanScheduleIndex } = this.props; // redux store
    const { isLoggedIn } = this.props;
    return (
      <div className="main-container">
        <CourseSelector
          selectedCourse={selectedCourse}
          selectedTerm={selectedTerm}
          clearValidSchedules={this.clearValidSchedules}
          clearErrorAndValidSchedules={this.clearErrorAndValidSchedules}
          addCourseSections={this.addCourseSections}
          deleteCourseFromSections={this.deleteCourseFromSections}
          deleteAllSections={this.deleteAllSections}
          generateSchedules={this.generateSchedules}
        />
        {
          (selectedCourse === '' && validSchedules.length === 0 && error === undefined) &&
          (loadingSchedules ?
            <div className="loader__container">
              <Loader className='loader' active>Loading Schedules...</Loader>
            </div>
            :
            <div className="app-root__error-msg-wrapper">
              <Message info>
                <p>Add some courses and then press the 'Generate Schedules' button see your schedules.</p>
              </Message>
            </div>
          )
        }
        {
          (selectedCourse) &&
          <CourseDetail
            selectedCourse={selectedCourse}
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
        { (selectedCourse === '' && validSchedules.length > 0) &&
        <div className="app-root__schedules-title-wrapper">
          {
            // don't render calendars unless both conditions inside () are true
            // note: selectedCourse must get reset to undefined when running
            // the algorithm
            <Schedules
              validSchedules={validSchedules}
              updateCurrSchedule={this.updateCurrSchedule}
              currIndex={currPlanScheduleIndex}
              isLoggedIn={isLoggedIn}
              selectedTerm={selectedTerm}
            />
          }
        </div>
        }
        <ToastContainer autoClose={3500}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCourse: state.selectedCourse,
    selectedTerm: state.selectedTerm,
    currPlanScheduleIndex: state.currPlanScheduleIndex,
  };
};

export default connect(mapStateToProps)(PlanSchedulePage);
