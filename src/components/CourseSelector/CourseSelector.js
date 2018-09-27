import React from 'react';
import { connect } from 'react-redux';
import AddCourse from './AddCourse';
import Courses from './Courses';
import { Button } from 'semantic-ui-react';
import './CourseSelector.css';
import { clearSelectedCourse } from "../../react-redux/actions/selectedCourse";

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

  handleTermChange = () => {
    // want to clear valid schedules and sections
    this.props.clearValidSchedules();
    this.props.deleteAllSections();
    this.setState({ courses: [] });
  };

  handleDeleteOneCourse = (course) => {
    this.setState((prevState) => ({
      courses: prevState.courses.filter((currCourseObj) => {
        return currCourseObj.name !== course
      })
    }));
    if (course === this.props.selectedCourse) {
      this.props.dispatch(clearSelectedCourse());
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
    const { selectedTerm } = this.props;
    const { courses } = this.state;
    return (
      <div className="course-selector__container">
        <div className="course-selector__courses">
          <AddCourse
            selectedTerm={selectedTerm}
            handleTermChange={this.handleTermChange}
            handleAddCourse={this.handleAddCourse}
            clearErrorAndValidSchedules={this.props.clearErrorAndValidSchedules}
          />
          <Courses
            courses={courses}
            handleDeleteOneCourse={this.handleDeleteOneCourse}
            clearErrorAndValidSchedules={this.props.clearErrorAndValidSchedules}
          />
          <div className="course-selector__gen-button-wrapper">
            <Button
              primary
              onClick={() => { this.props.generateSchedules(courses, selectedTerm.value) }}
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

export default connect()(CourseSelector);
