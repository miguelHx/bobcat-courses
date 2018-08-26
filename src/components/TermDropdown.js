import React from "react";
import { Dropdown } from "semantic-ui-react";
import './TermDropdown.css';

const TERM_OPTIONS = [
  { key: 'Fall 2018', value: '201830', text: 'Fall 2018' },
  { key: 'Spring 2018', value: '201810', text: 'Spring 2018' }
];

export default class TermDropdown extends React.Component {


  render() {
    return (
      <div className="term-dropdown-wrapper">
        Current Term:{' '}
        <Dropdown
          inline
          text={this.props.selectedTermObject.text}
          options={TERM_OPTIONS}
          onChange={this.props.handleTermDropdownChange}
        />
      </div>
    );
  }
}
