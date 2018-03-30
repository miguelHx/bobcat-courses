import React from 'react';
import { Button } from 'semantic-ui-react';

const Course = (props) => {
  return (
    <div>
      <p>{props.count}. {props.courseText}</p>
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
  );
};

export default Course;
