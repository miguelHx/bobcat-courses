import React from 'react';
import { Button } from 'semantic-ui-react';

const Course = (props) => {
  return (
    <div className="course">
      <p className="course__text">{props.courseText}</p>
      <div>
        <Button
          size='mini'
          compact
          onClick={() => {
            props.updateSelectedDept(props.deptText);
            props.updateSelectedCourse(props.courseText);
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

export default Course;
