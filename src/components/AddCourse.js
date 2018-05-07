import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { DEPT_SHORTHAND } from './../lib/ShorthandDeptLookup';

export default class AddCourse extends React.Component {
  state = {
    error: undefined
  };

  loadDepartmentOptions = () => {
    // don't map until window.jsonData is loaded.
    if (!window.deptList) {
      return [];
    }
    return (
      window.deptList.map((dept) => {
        let text = `${dept} (${DEPT_SHORTHAND[dept]})`;
        return (
          { key: dept, value: dept, text: text }
        );
      })
    );
  };

  loadCourseOptions = () => {
    // don't map until window jsonData is loaded OR department is selected
    if (!this.props.selectedDepartment) {
      return [];
    }
    // update state to first option in department
    return (
      this.props.courseDropdownList.map((course) => {
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
  };

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
    // * addCourseSections will update selected course so might not even need the next line
    this.props.updateSelectedCourse(course);
  };

  render() {
    return (
      <div className="add-course__container">
        <h3 className="add-course__header__title">Add a Course</h3>
        <div className="add-course__dropdown-wrapper">
          <Dropdown
            placeholder='Department/Subject'
            selectOnNavigation={false}
            search
            selection
            options={this.loadDepartmentOptions()}
            onChange={this.handleDeptDropdown}
            id="add-course__dept-dropdown"
          />
          <Dropdown
            placeholder='Course Number/Title'
            selectOnNavigation={false}
            search
            selection
            options={this.loadCourseOptions()}
            onChange={this.handleCourseDropdown}
            noResultsMessage='Please select a Department'
          />
        </div>
        {this.state.error && <p className="add-course-error">{this.state.error}</p>}
      </div>
    );
  }
}
