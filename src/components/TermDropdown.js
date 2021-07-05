import React from "react";
import { connect } from 'react-redux';
import { Dropdown } from "semantic-ui-react";
import './TermDropdown.css';
import { clearSelectedCourse } from "../react-redux/actions/selectedCourse";
import { setSelectedTerm } from "../react-redux/actions/selectedTerm";

const TERM_OPTIONS = [
  { key: 'Fall 2021', value: '202130', text: 'Fall 2021' },
];


class TermDropdown extends React.Component {

  handleTermDropdownChange = (event, data) => {
    event.persist();
    const termText = event.target.textContent;
    const { selectedTerm } = this.props;
    if (termText === selectedTerm.text) {
      return; // no change
    }
    const termValue = data.value;
    this.props.handleTermDropdownChange(termText, termValue);
    this.props.dispatch(clearSelectedCourse());
    this.props.dispatch(setSelectedTerm(termText, termValue));
  };

  render() {
    return (
      <div className="term-dropdown-wrapper">
        Current Term:{' '}
        <Dropdown
          inline
          text={this.props.selectedTerm.text}
          options={TERM_OPTIONS}
          onChange={this.handleTermDropdownChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTerm: state.selectedTerm,
  };
};

export default connect(mapStateToProps)(TermDropdown);
