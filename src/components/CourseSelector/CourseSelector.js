import React from 'react';
import { connect } from 'react-redux';
import AddCourse from './AddCourse';
import Courses from './Courses';
import { Button, Accordion } from 'semantic-ui-react';
import { clearSelectedCourse } from "../../react-redux/actions/selectedCourse";
import AdvancedOptionsForm from "../Forms/AdvancedOptionsForm";
import CustomEventModal from "./CustomEventModal";
import './CourseSelector.css';
import CustomEvents from "./CustomEvents/CustomEvents";

const MAX_NUM_COURSES = 7;

class CourseSelector extends React.Component {
  state = {
    courses: [],
    customEvents: this.props.customEvents, // from redux store
    accordionActive: false,
    gaps: null,
    days: null,
    earliest_time: null,
    latest_time: null,
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

  handleAccordionClick = (event) => { this.setState((prevState) => ({ accordionActive: !prevState.accordionActive })); };

  handleGapsChange = (gaps) => { this.setState({ gaps }) };

  handleDaysChange = (days) => { this.setState({ days }) };

  handleEarliestTimeChange = (earliest_time) => { this.setState({ earliest_time }) };

  handleLatestTimeChange = (latest_time) => { this.setState({ latest_time }) };


  render() {
    const { selectedTerm, customEvents } = this.props;
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
          <CustomEvents
            customEvents={customEvents}
          />
          <div className="course-selector__gen-button-wrapper">
            <Button
              primary
              onClick={() => {
                const { days, gaps, earliest_time, latest_time } = this.state;
                this.props.generateSchedules(courses, selectedTerm.value, days, gaps, earliest_time, latest_time);
              }}
              disabled={this.state.courses.length === 0}
              size='large'
            >
              Generate Schedules
            </Button>
          </div>
          <div className="course-selector__custom-event-btn">
            <CustomEventModal />
          </div>
          <div>
            <Accordion>
              <Accordion.Title
                active={this.state.accordionActive}
                content={<span id="course-selector__advanced-options-text">Advanced Options...</span>}
                onClick={this.handleAccordionClick}
              />
              <Accordion.Content active={this.state.accordionActive}>
                <AdvancedOptionsForm
                  handleGapsChange={this.handleGapsChange}
                  handleDaysChange={this.handleDaysChange}
                  handleEarliestTimeChange={this.handleEarliestTimeChange}
                  handleLatestTimeChange={this.handleLatestTimeChange}
                />
              </Accordion.Content>
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customEvents: state.customEvents
  };
};

export default connect(mapStateToProps)(CourseSelector);
