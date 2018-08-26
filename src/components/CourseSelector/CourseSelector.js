import React from 'react';
import AddCourse from './AddCourse';
import Courses from './Courses';
import { Button } from 'semantic-ui-react';
import './CourseSelector.css';

const MAX_NUM_COURSES = 7;

class CourseSelector extends React.Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    const tempCoursesList = sessionStorage.getItem("tempCoursesList");
    if (tempCoursesList !== null) {
      this.setState(() => ({ courses: JSON.parse(tempCoursesList) }));
    }
  }

  componentWillUnmount() {
    // want to save valid schedules (if any) to session storage
    const { courses } = this.state;
    if (courses.length > 0) {
      sessionStorage.setItem("tempCoursesList", JSON.stringify(courses));
    }
    else {
      sessionStorage.removeItem("tempCoursesList");
    }
  }

  handleTermChange = (termObject) => {
    this.props.updateSelectedTermObject(termObject);
    this.setState(() => ({
      selectedTermObject: termObject,
      searchResults: [],
      courses: [],
    }));
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

  handleAddCourse = (course, term) => {
    const courses = this.state.courses;
    // loop through array of objects, and check if course already exists
    for (let i = 0; i < courses.length; i++) {
      let currObject = courses[i];
      if (currObject.name === course) {
        return "This course already exists.";
      }
    }
    if (!course) {
      return "Select a valid course to add.";
    }
    if (courses.length >= MAX_NUM_COURSES) {
      return "Max amount of courses reached.";
    }
    const courseObj = {
      name: course,
    };

    this.setState((prevState) => ({
      courses: prevState.courses.concat(courseObj)
    }));
    this.props.addCourseSections(course, term);
  };

  render() {
    return (
      <div className="course-selector__container">
        <div className="course-selector__courses">
          <AddCourse
            selectedTermObject={this.props.selectedTermObject}
            handleTermChange={this.handleTermChange}
            handleAddCourse={this.handleAddCourse}
            updateSelectedCourse={this.props.updateSelectedCourse}
            courseDropdownList={this.state.courseDropdownList}
          />
          <Courses
            courses={this.state.courses}
            handleDeleteCourses={this.handleDeleteCourses}
            handleDeleteOneCourse={this.handleDeleteOneCourse}
            updateSelectedCourse={this.props.updateSelectedCourse}
          />
          <div className="course-selector__gen-button-wrapper">
            <Button
              primary
              onClick={() => { this.props.generateSchedules(this.state.courses, this.props.selectedTermObject.value) }}
              disabled={this.state.courses.length === 0}
              size='large'
            >
              Generate Schedules
            </Button>
          </div>

        </div>
      </div>
    );
  }
}

export default CourseSelector;
