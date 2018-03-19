import React from 'react';
import ReactDOM from 'react-dom';
import courseJSON from './../data/courses_sample_data.json';
import AddCourse from './components/AddCourse';
import Courses from './components/Courses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

// TODO
// * make a AddOption component for error checking
// * refactor to separate components

class Template extends React.Component {
  state = {
    // default state values
    selectedDepartment: '',
    selectedCourse: '',
    courses: [],
  }

  componentDidMount() {
    //initialize data
    console.log("comp. mounted.  Want to get json data and store either locally (for development) or through an AJAX request (production).");
    window.jsonData = courseJSON;
    const departments = Object.keys(window.jsonData);
    const courses = Object.keys(window.jsonData[departments[0]]);

    //const jsonObj = JSON.parse(courseJSON);
    console.log("JSON file: ");
    console.log(window.jsonData);
    //console.log(jsonObj);
    console.log("Printing out main keys from JSON file:");
    console.log(departments);
    console.log("printing out courses from Anthropology");
    console.log(courses);


    this.setState(() => ({ selectedDepartment: departments[0], selectedCourse: courses[0] }));
    // print courses from Anthropology
  }

  handleDeptDropdown = (event) => {
    // want to update selectedCourse state as well
    const dept = event.target.value;
    const course = Object.keys(window.jsonData[dept])[0];
    this.setState(() => ({ selectedDepartment: dept, selectedCourse: course}));
  }

  handleCourseDropdown = (event) => {
    const course = event.target.value;
    this.setState(() => ({ selectedCourse: course }));
  }

  handleDeleteCourses = () => {
    this.setState(() => ({ courses: [] }));
  }

  handleDeleteOneCourse = (course) => {
    this.setState((prevState) => ({
      courses: prevState.courses.filter((currCourse) => {
        return currCourse !== course
      })
    }));
  }

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
        <h1>Bobcat Courses</h1>
        <p>Selected Department: {this.state.selectedDepartment}</p>
        <p>Selected Course: {this.state.selectedCourse}</p>
        <AddCourse
          handleAddCourse={this.handleAddCourse}
          handleDeptDropdown={this.handleDeptDropdown}
          handleCourseDropdown={this.handleCourseDropdown}
          selectedDepartment={this.state.selectedDepartment}
        />
        <Courses
          courses={this.state.courses}
          handleDeleteCourses={this.handleDeleteCourses}
          handleDeleteOneCourse={this.handleDeleteOneCourse}
        />
      </div>
    );
  }
}


ReactDOM.render(<Template />, document.getElementById('app'));
