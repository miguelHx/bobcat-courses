import React from 'react';

const Course = (props) => {
  return (
    <div>
      <p>{props.count}. {props.courseText}</p>
      <button onClick={() => {
        props.updateSelectedDept(props.deptText);
        props.updateSelectedCourse(props.courseText);
      }}>
        (sections)
      </button>
      <button
        onClick={(e) => {
          props.handleDeleteOneCourse(props.courseText);
        }}
      >
        remove
      </button>
    </div>
  );
};

export default Course;
