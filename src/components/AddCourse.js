import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const stateOptions = [{key: 'Al', value: 'AL', text: 'Alabama'}, {key: 'BA', value: 'BA', text: 'Bammington'}]

export default class AddCourse extends React.Component {
  state = {
    error: undefined
  };

  loadDepartmentOptions = () => {
    // don't map until window.jsonData is loaded.
    if (!window.jsonData) {
      return [];
    }
    return (
      Object.keys(window.jsonData).map((dept) => {
        return (
          { key: dept, value: dept, text: dept }
        );
      })
    );
  };

  loadCourseOptions = () => {
    // don't map until window jsonData is loaded OR department is selected
    if (!window.jsonData || !this.props.selectedDepartment) {
      return [];
    }
    // update state to first option in department
    return (
      Object.keys(window.jsonData[`${this.props.selectedDepartment}`]).map((course) => {
        return (
          { key: course, value: course, text: course }
        );
      })
    );
  };

  handleDeptDropdown = (event, data) => {
    const error = this.state.error;
    const dept = data.value;
    this.props.handleDeptDropdown(dept);
    // also remove error message if there is one.
    if (error) {
      this.setState(() => ({ error: undefined }));
    }
  }

  handleCourseDropdown = (event, data) => {
    // whenever course dropdown changes, we want to also add course to list
    const course = data.value;
    const error = this.props.handleAddCourse(course);

    if (error) {
      this.setState(() => ({ error: error }));
      return;
    }
    // remove previous error (if there is one)
    this.setState(() => ({ error: undefined }));
    // update selected course in root component
    this.props.updateSelectedCourse(course);
  }

  render() {
    return (
      <div className="add-course__container">
        <h3 className="add-course__header__title">Add a Course</h3>
        <Dropdown
          placeholder='Department'
          selectOnNavigation={false}
          search
          selection
          options={this.loadDepartmentOptions()}
          onChange={this.handleDeptDropdown}
        />
        <Dropdown
          placeholder='Course'
          selectOnNavigation={false}
          search
          selection
          options={this.loadCourseOptions()}
          onChange={this.handleCourseDropdown}
        />
        {this.state.error && <p className="add-course-error">{this.state.error}</p>}
      </div>
    );
  }
}
