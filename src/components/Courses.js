import React from 'react';
import Course from './Course';
import { Button } from 'semantic-ui-react';

const Courses = (props) => {
  return (
    <div>
      <div className="course-selector__header">
        <h3 className="course-selector__header__title">My Courses</h3>
        <Button negative size='medium' onClick={props.handleDeleteCourses}>
          Remove All
        </Button>
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
      <br></br>
      <br></br>
    </div>
  );
};

export default Courses;
