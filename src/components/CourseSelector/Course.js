import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { setSelectedCourse } from "../../react-redux/actions/selectedCourse";
import './Course.css';

const Course = (props) => {
  return (
    <div className="course">
      <p className="course__text">{props.courseText}</p>
      <div>
        <Button
          size='mini'
          compact
          onClick={() => {
            props.updateSelectedCourse(props.courseText);
            props.dispatch(setSelectedCourse(props.courseText));
            props.clearErrorAndValidSchedules();
          }}
          >
          (Sections)
        </Button>
        <Button
          size='mini'
          compact
          color='red'
          onClick={() => { props.handleDeleteOneCourse(props.courseText) }}
          >
          X
        </Button>
      </div>
    </div>
  );
};

export default connect()(Course);
