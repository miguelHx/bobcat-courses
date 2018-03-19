import React from 'react';
import Course from './Course';

const Courses = (props) => {
  return (
    <div>
      <div>
        <h3>My Courses</h3>
        <button
          onClick={props.handleDeleteCourses}
        >
          Remove All
        </button>
      </div>
      {
        props.courses.map((course, index) => {
          return (
            <Course
              key={course}
              courseText={course}
              count={index + 1}
              handleDeleteOneCourse={props.handleDeleteOneCourse}
            />
          );
        })
      }
    </div>
  );
};

export default Courses;
