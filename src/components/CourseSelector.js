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
    this.props.clearSelectedCourse();
  };

  handleDeleteOneCourse = (course) => {
    this.setState((prevState) => ({
      courses: prevState.courses.filter((currCourse) => {
        return currCourse !== course
      })
    }));

    if (course === this.props.selectedCourse) {
      this.props.clearSelectedCourse();
    }
  };

  handleAddCourse = (course) => {
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
          updateSelectedCourse={this.props.updateSelectedCourse}
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
          updateSelectedCourse={this.props.updateSelectedCourse}
        />
        <button onClick={this.props.generateSchedules}>
          Generate Schedules
        </button>
      </div>
    );
  }
}

export default CourseSelector;
