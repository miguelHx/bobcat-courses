import React from 'react';
import ReactDOM from 'react-dom';
import AddCourse from './AddCourse';
import Courses from './Courses';

// TODO
// * make a AddOption component for error checking
// * refactor to separate components

class CourseSelector extends React.Component {
  state = {
    // default state values
    courses: [], // maybe store array of course objects in here? will be easier for algorithm
  };

  componentDidMount() {

  }

  handleDeptDropdown = (event) => {
    // want to update selectedCourse state as well by calling handler from app root
    const dept = event.target.value;
    const course = Object.keys(window.jsonData[dept])[0];
    this.props.handleDeptDropdown(dept);
  };

  handleCourseDropdown = (event) => {
    const course = event.target.value;
    this.props.handleCourseDropdown(course);
  };

  handleDeleteCourses = () => {
    this.setState(() => ({ courses: [] }));
  };

  handleDeleteOneCourse = (course) => {
    this.setState((prevState) => ({
      courses: prevState.courses.filter((currCourse) => {
        return currCourse !== course
      })
    }));
  };

  handleAddCourse = (course) => {
    console.log(course);

    if (!course) {
      return "Select a valid course to add.";
    }
    else if (this.state.courses.indexOf(course) > -1) {
      return "This course already exists";
    }

    this.setState((prevState) => ({
      courses: prevState.courses.concat(course)
    }));
  };

  // move generate schedules into root directory
  generateSchedules = () => {
    console.log("Want to first check size of courses array.");
    console.log("Take courses, use courses array to get information from JSON, run algorithm.");
    console.log("Decide what data we want to use to run the algorithm.");
    console.log("Store result of algo in some sort of data structure, to be used by the Calendar component");
  };

  render() {
    return (
      <div>
        <AddCourse
          handleAddCourse={this.handleAddCourse}
          handleDeptDropdown={this.handleDeptDropdown}
          handleCourseDropdown={this.handleCourseDropdown}
          selectedDepartment={this.props.selectedDepartment}
        />
        {
          this.state.courses.length === 0 &&
          <p>Please add a course to get started.</p>
        }
        <Courses
          courses={this.state.courses}
          handleDeleteCourses={this.handleDeleteCourses}
          handleDeleteOneCourse={this.handleDeleteOneCourse}
        />
        <button onClick={this.generateSchedules}>
          Generate Schedules
        </button>
      </div>
    );
  }
}

export default CourseSelector;
