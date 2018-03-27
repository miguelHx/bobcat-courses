import React from 'react';
import ReactDOM from 'react-dom';
import CourseDetail from './components/CourseDetail';
import CourseSelector from './components/CourseSelector';
import Schedules from './components/Schedules';
import courseJSON from './../data/courses_sample_data.json';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


class AppRoot extends React.Component {
  state = {
    selectedDepartment: undefined,
    selectedCourse: undefined, // for course detail table
    selectedSections: [], // for algorithm
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


    this.setState(() => ({ selectedDepartment: departments[0] }));
  }

  handleDeptDropdown = (dept) => {
    this.setState(() => ({ selectedDepartment: dept }));
  };

  handleCourseDropdown = (course) => {
    this.setState(() => ({ selectedCourse: course }));
  };

  render() {
    // only render course detail if a course is selected
    // only render calendar component if valid schedules has size > 0
    // if generate schedules is ran, but there is a conflict, then
    // notify user and reset state
    const selectedDepartment = this.state.selectedDepartment;
    const selectedCourse = this.state.selectedCourse;
    const validSchedules = this.state.validSchedules;
    return (
      <div>
        {/* header component will replace h1 below */}
        <h1>Bobcat Courses</h1>
        <p>Selected Department (in root comp.): {this.state.selectedDepartment}</p>
        <p>Selected Course (in root comp.): {this.state.selectedCourse}</p>
        <CourseSelector
          selectedDepartment={selectedDepartment}
          handleDeptDropdown={this.handleDeptDropdown}
          handleCourseDropdown={this.handleCourseDropdown}
        />
        { selectedCourse && <CourseDetail /> }
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
