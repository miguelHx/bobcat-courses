import React from 'react';
import ReactDOM from 'react-dom';
import AddCourse from './AddCourse';
import Courses from './Courses';
import { Button } from 'semantic-ui-react';

class CourseSelector extends React.Component {
  state = {
    courses: [], // array of course objects { name: '...', department: '...' }
  };

  componentDidMount() {

  }

  handleDeptDropdown = (dept) => {
    // want to update selectedCourse state as well by calling handler from app root
    this.props.updateSelectedDept(dept);
    this.props.clearSelectedCourse();
  };

  handleDeleteCourses = () => {
    this.setState(() => ({ courses: [] }));
    this.props.clearSelectedCourse();
    this.props.deleteAllSections();
  };

  handleDeleteOneCourse = (course) => {
    this.setState((prevState) => ({
      courses: prevState.courses.filter((currCourseObj) => {
        return currCourseObj.name !== course
      })
    }));

    if (course === this.props.selectedCourse) {
      this.props.clearSelectedCourse();
    }
    // also update sections in root
    this.props.deleteCourseFromSections(course);

  };

  handleAddCourse = (course) => {
    const courses = this.state.courses;
    const dept = this.props.selectedDepartment;
    if (!course) {
      return "Select a valid course to add.";
    }

    // loop through array of objects, and check if course already exists
    for (let i = 0; i < courses.length; i++) {
      let currObject = courses[i];
      if (currObject.name === course) {
        return "This course already exists.";
      }
    }

    const courseObj = {
      name: course,
      department: dept
    };

    this.setState((prevState) => ({
      courses: prevState.courses.concat(courseObj)
    }));
    this.props.addCourseSections(dept, course);
  };

  render() {
    return (
      <div className="course-selector__container">
        <div className="course-selector__courses">
          <AddCourse
            handleAddCourse={this.handleAddCourse}
            handleDeptDropdown={this.handleDeptDropdown}
            updateSelectedCourse={this.props.updateSelectedCourse}
            selectedDepartment={this.props.selectedDepartment}
          />
          <Courses
            courses={this.state.courses}
            handleDeleteCourses={this.handleDeleteCourses}
            handleDeleteOneCourse={this.handleDeleteOneCourse}
            updateSelectedCourse={this.props.updateSelectedCourse}
            updateSelectedDept={this.props.updateSelectedDept}
            selectedDepartment={this.props.selectedDepartment}
          />
          {
            this.state.courses.length === 0 &&
            <p className="course-selector__message">Please add a course to get started.</p>
          }
        </div>
        <Button
          primary
          onClick={this.props.generateSchedules}
          disabled={this.state.courses.length === 0}
        >
          Generate Schedules
        </Button>
      </div>
    );
  }
}

export default CourseSelector;
