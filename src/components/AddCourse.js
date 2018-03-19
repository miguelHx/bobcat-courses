import React from 'react';

export default class AddCourse extends React.Component {
  state = {
    error: undefined
  };

  loadDepartmentOptions = () => {
    // don't map until window.jsonData is loaded.
    if (!window.jsonData) {
      return (
        <option>Loading...</option>
      );
    }
    return (
      Object.keys(window.jsonData).map((dept) => {
        return (
          <option key={dept} value={dept}>{dept}</option>
        );
      })
    );
  };

  loadCourseOptions = () => {
    // don't map until window jsonData is loaded OR department is selected
    if (!window.jsonData || !this.props.selectedDepartment) {
      return (
        <option>Loading...</option>
      );
    }
    // update state to first option in department
    return (
      Object.keys(window.jsonData[`${this.props.selectedDepartment}`]).map((course) => {
        return (
          <option key={course} value={course}>{course}</option>
        );
      })
    );
  };

  handleAddCourse = (e) => {
    e.preventDefault();

    const course = e.target.elements[1].value.trim();
    const error = this.props.handleAddCourse(course);

    this.setState(() => ({ error }));

  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddCourse}>
          <select name="dept-dropdown" onChange={this.props.handleDeptDropdown}>
            {
              this.loadDepartmentOptions()
            }
          </select>
          <select name="course-dropdown" onChange={this.props.handleCourseDropdown}>
            {
              this.loadCourseOptions()
            }
          </select>
          <input type="submit" value="Add Course" />
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}
