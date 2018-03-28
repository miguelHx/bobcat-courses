import React from 'react';
import ReactDOM from 'react-dom';
import AddCourse from './AddCourse';
import Courses from './Courses';

class CourseSelector extends React.Component {
  state = {
    courses: [], // maybe store array of course objects in here? will be easier for algorithm
  };

  componentDidMount() {

  }

  handleDeptDropdown = (event, data) => {
    // want to update selectedCourse state as well by calling handler from app root
    const dept = data.value;
    this.props.updateSelectedDept(dept);
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

  render() {
    return (
      <div>
        <AddCourse
          handleAddCourse={this.handleAddCourse}
          handleDeptDropdown={this.handleDeptDropdown}
          handleCourseDropdown={this.props.updateSelectedCourse}
          selectedDepartment={this.props.selectedDepartment}
        />
        {
          this.state.courses.length === 0 &&
          <p>Please add a course to get started.</p>
        }
        { this.state.error && <p>{this.state.error}</p> }
        <Courses
          courses={this.state.courses}
          handleDeleteCourses={this.handleDeleteCourses}
          handleDeleteOneCourse={this.handleDeleteOneCourse}
        />
        <button onClick={this.props.generateSchedules}>
          Generate Schedules
        </button>
      </div>
    );
  }
}

export default CourseSelector;
