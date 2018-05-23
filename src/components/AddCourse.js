import React from 'react';
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react';
import axios from "axios/index";

const ROOT_API_URL = 'https://cse120-course-planner.herokuapp.com/api';

const ignoreHyphenSearch = (options, query) => {
  const re = new RegExp('^' + query, 'i');
  return options.filter((option) => {
    return re.test(option.text.replace('-', ''));
  });
};

export default class AddCourse extends React.Component {
  state = {
    error: undefined,
    isFetching: false,
    searchResults: [],
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

  handleSearch = _.debounce((event, data) => {
    this.setState(() => ({ isFetching: true }));
    if (data === '') {
      return;
    }
    const query = encodeURIComponent(data.searchQuery);
    let params = `course=${query}&term=201830`;
    axios.get(`${ROOT_API_URL}/courses/course-search/?${params}`)
      .then(res => {
        // console.log(res);
        let results = res.data;
        if (!results) {
          results = [];
        }
        else if (results.indexOf("Server Error") >= 0) {
          results = [];
          // console.log("SERVER ERROR"); // alert the user
        }
        this.setState(() => ({
          isFetching: false,
          searchResults: results.map((course) => {
            return { key: course.name, value: course.name, text: course.name };
          })
        }));
      })
      .catch(error => {
        // console.log("error: ", error); // alert user
      });
    }, 300);


  render() {
    const { searchResults } = this.state;
    return (
      <div className="add-course__container">
        <h3 className="add-course__header__title">Add a Course</h3>
        <div className="add-course__dropdown-wrapper">
          <Dropdown
            placeholder={'Search For a Course'}
            selectOnNavigation={false}
            search={ignoreHyphenSearch}
            selection
            options={searchResults}
            autoComplete='on'
            onChange={this.handleCourseDropdown}
            onSearchChange={this.handleSearch}
            noResultsMessage={'No results yet.'}
            loading={this.state.isFetching}
          />
        </div>
        {this.state.error && <p className="add-course-error">{this.state.error}</p>}
      </div>
    );
  }
}
