import React from 'react';

const Course = (props) => {
  return (
    <div>
      <p>{props.count}. {props.courseText}</p>
      <button>
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
