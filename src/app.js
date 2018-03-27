import React from 'react';
import ReactDOM from 'react-dom';
import CourseDetail from './components/CourseDetail';
import CourseSelector from './components/CourseSelector';
import Schedules from './components/Schedules';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


class AppRoot extends React.Component {
  state = {
    selectedCourse: undefined, // for course detail table
    selectedSections: [], // for algorithm
    validSchedules: [], // for calendars
  };

  componentWillMount() {

    console.log("in the root app component, want to load JSON data here.");
    console.log("this function will execute before render() is called.");
  }

  render() {
    // only render course detail if a course is selected
    // only render calendar component if valid schedules has size > 0
    // if generate schedules is ran, but there is a conflict, then
    // notify user and reset state
    const selectedCourse = this.state.selectedCourse;
    const validSchedules = this.state.validSchedules;
    return (
      <div>
        {/* header component will replace h1 below */}
        <h1>Bobcat Courses</h1>
        <CourseSelector />
        { selectedCourse && <CourseDetail /> }
        {
          // don't render calendars unless both conditions inside () are true
          // note: selectedCourse must get reset to undefined when running
          // the algorithm
          (validSchedules.length > 0 && selectedCourse === undefined)
           && <Schedules />
        }
        {/* footer component will go here */}
      </div>
    );
  }
}



ReactDOM.render(<AppRoot />, document.getElementById('app'));
