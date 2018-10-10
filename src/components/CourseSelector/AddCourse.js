import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import BobcatCoursesApi from '../../api/BobcatCoursesApi';
import TermDropdown from "../TermDropdown";
import { setSelectedCourse } from "../../react-redux/actions/selectedCourse";
import './AddCourse.css';


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
    selectedTerm: this.props.selectedTerm, // an object, from parent plan schedule
  };

  handleTermDropdownChange = (termText, termValue) => {
    const termObject = { text: termText, value: termValue };
    this.props.handleTermChange();
    this.setState({ searchResults: [], selectedTerm: termObject });
  };

  handleCourseDropdownChange = (event, data) => {
    // whenever course dropdown changes, we want to also add course to list
    const course = data.value;
    const { selectedTerm } = this.props; // from parent
    const error = this.props.handleAddCourse(course, selectedTerm.value);

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
    const query = encodeURIComponent(data.searchQuery);
    if (query === '') {
      this.setState({ isFetching: false });
      return;
    }
    const { selectedTerm } = this.props;
    let params = `course=${query}&term=${selectedTerm.value}`;
    BobcatCoursesApi.searchCourses(params)
      .then(res => {
        let results = res || [];
        if (results.length === 0) {
          this.setState({ isFetching: false });
          return;
        }
        this.setState(() => ({
          isFetching: false,
          searchResults: results.map((course) => {
            return { key: course.name, value: course.name, text: `${course.name}: ${course.description}` };
          })
        }));
      })
      .catch(error => {
        this.setState({ error: error.toString() });
      });
    }, 300);


  render() {
    const { searchResults } = this.state;
    return (
      <div className="add-course__container">
        <TermDropdown
          handleTermDropdownChange={this.handleTermDropdownChange}
        />
        <h3 className="add-course__header__title">Add a Course</h3>
        <div className="add-course__dropdown-wrapper">
          <Dropdown
            placeholder={'Type Course Here'}
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
