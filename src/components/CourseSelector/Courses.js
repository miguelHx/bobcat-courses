import React from 'react';
import Course from './Course';
import './Courses.css';

const Courses = (props) => {
  return (
    <div>
      {
        props.courses.map((course, index) => {
          // course is now an object containing dept AND course text
          return (
            <Course
              key={course.name}
              courseText={course.name}
              deptText={course.department}
              count={index + 1}
              handleDeleteOneCourse={props.handleDeleteOneCourse}
              clearErrorAndValidSchedules={props.clearErrorAndValidSchedules}
            />
          );
        })
      }
    </div>
  );
};

export default Courses;
