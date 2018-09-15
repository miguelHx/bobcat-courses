import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import BobcatCoursesApi from '../../api/BobcatCoursesApi';
import TermDropdown from "../TermDropdown";
import { clearSelectedCourse, setSelectedCourse } from "../../react-redux/actions/selectedCourse";
import './AddCourse.css';

const DEFAULT_TERM = { text: 'Fall 2018', value: '201830' }; // fall 2018

const customSearch = (options, query) => {
  const re = new RegExp('^' + query, 'i');
  return options.filter((option) => {
    // test original text, or without hyphen, or without space
    return re.test(option.text.replace('-', '')) || re.test(option.text.replace('-', ' '));
  });
};

class AddCourse extends React.Component {
  state = {
    error: undefined,
    isFetching: false,
    searchResults: [],
    selectedTermObject: DEFAULT_TERM, // an object
  };

  handleTermDropdownChange = (event, data) => {
    event.persist();
    const termText = event.target.textContent;
    const termValue = data.value;
    const termObject = { text: termText, value: termValue };
    this.props.handleTermChange(termObject);
    this.props.dispatch(clearSelectedCourse());
    this.setState(() => ({ searchResults: [], selectedTermObject: termObject }));
  };

  handleCourseDropdownChange = (event, data) => {
    // whenever course dropdown changes, we want to also add course to list
    const course = data.value;
    const { selectedTermObject } = this.props;
    const error = this.props.handleAddCourse(course, selectedTermObject.value);

    if (error) {
      this.setState(() => ({ error: error }));
      return;
    }
    // remove previous error (if there is one) and set course text.
    this.setState(() => ({ error: undefined }));
    // update selected course in root component
    // * addCourseSections will update selected course so might not even need the next line
    this.props.dispatch(setSelectedCourse(course));
    this.props.clearErrorAndValidSchedules();
  };

  handleSearch = _.debounce((event, data) => {
    this.setState(() => ({ isFetching: true }));
    if (data === '') {
      return;
    }
    const query = encodeURIComponent(data.searchQuery);
    const { selectedTermObject } = this.props;
    let params = `course=${query}&term=${selectedTermObject.value}`;
    BobcatCoursesApi.searchCourses(params)
      .then(res => {
        let results = res.data;
        if (!results) {
          results = [];
        }
        else if (res.status < 200 && res.status >= 300) {
          results = [];
          console.log("SERVER ERROR"); // alert the user
        }
        this.setState(() => ({
          isFetching: false,
          searchResults: results.map((course) => {
            return { key: course.name, value: course.name, text: `${course.name}: ${course.description}` };
          })
        }));
      })
      .catch(error => {
        console.log("error: ", error); // alert user
      });
    }, 300);


  render() {
    const { searchResults } = this.state;
    return (
      <div className="add-course__container">
        <TermDropdown
          handleTermDropdownChange={this.handleTermDropdownChange}
          selectedTermObject={this.props.selectedTermObject}
        />
        <h3 className="add-course__header__title">Add a Course</h3>
        <div className="add-course__dropdown-wrapper">
          <Dropdown
            placeholder={'Search For a Course'}
            selectOnNavigation={false}
            search={customSearch}
            selection
            options={searchResults}
            autoComplete='on'
            onChange={this.handleCourseDropdownChange}
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

// connecting will give use access to dispatch function
export default connect()(AddCourse);
