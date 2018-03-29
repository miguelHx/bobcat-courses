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
          // course is now an object containing dept AND course text
          return (
            <Course
              key={course.name}
              courseText={course.name}
              deptText={course.department}
              count={index + 1}
              handleDeleteOneCourse={props.handleDeleteOneCourse}
              updateSelectedCourse={props.updateSelectedCourse}
              updateSelectedDept={props.updateSelectedDept}
            />
          );
        })
      }
    </div>
  );
};

export default Courses;
