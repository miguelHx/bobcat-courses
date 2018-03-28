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

  handleCourseDropdown = (event, data) => {
    // whenever course dropdown changes, we want to also add course to list
    const course = data.value;
    const error = this.props.handleAddCourse(course);

    if (error) {
      console.log("error", error);
      this.setState(() => ({ error: error }));
      return;
    }
    // update selected course in root app
    this.props.handleCourseDropdown(course);
  }

  render() {
    return (
      <div>
        <Dropdown
          placeholder='Department'
          search
          selection
          options={this.loadDepartmentOptions()}
          onChange={this.props.handleDeptDropdown}
        />
        <Dropdown
          placeholder='Course'
          search
          selection
          options={this.loadCourseOptions()}
          onChange={this.handleCourseDropdown}
        />
        <br></br>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}
