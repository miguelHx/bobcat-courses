import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Button } from 'semantic-ui-react';
import { extractSectionsFromSchedule } from './../lib/WeeklyCalendarUtils';
import { convertTimeStringTo24 } from './../lib/WeeklyCalendarUtils';
import WeeklyCalendarHeader from './WeeklyCalendarHeader';
import WeeklyCalendarView from './WeeklyCalendarView';

let id = 1000;

const HOUR_SLOT_HEIGHT = 75;

let colors = [
  { bg: '#bfecff', border: '#34aadc', text: '#1f6583' }, // blue
  { bg: '#fff2bf', border: '#ffcc00', text: '#a68500' }, // yellow
  { bg: '#f3bfff', border: '#cc73e1', text: '#7b4488' }, // purple
  { bg: '#ffbfcb', border: '#ff2d55', text: '#a61d37' }, // red
  { bg: '#ffe5bf', border: '#ff9500', text: '#a66100' }, // orange
  { bg: '#d1ffbf', border: '#65db39', text: '#3c8222' }, // green
  { bg: '#e0d3c1', border: '#a2845e', text: '#4d3c26' }, // brown
];

let colorsIdx = 0;

class Schedules extends React.Component {
  state = {
    currIndex: 0,
  };

  componentDidMount() {
    // initial rendering of sections onto page
    const currIdx = this.state.currIndex;
    const currSchedule = this.props.validSchedules[currIdx];
    const sectionsList = extractSectionsFromSchedule(currSchedule);

    const earliest = currSchedule['info']['earliest'];
    const start = (Math.floor(earliest/100)*100)/100;
    this.placeSectionsIntoCalendar(start, sectionsList, 0);
    // need to update parent class for deleting current schedule when clicking delete button.
    if (this.props.updateCurrSchedule) {
      this.props.updateCurrSchedule(currSchedule, currIdx);
    }
  }


  placeSectionsIntoCalendar = (startingHour, allSections) => {

    let startHr = (startingHour * 100).toString(10); // will be used for moment js

    let hr;
    if (startingHour < 10) {
       hr = `0${startHr.substring(0, 1)}`;
    }
    else {
      hr = startHr.substring(0, 2);
    }
    const min = startHr.slice(-2);
    startHr = moment(`${hr}:${min}`, 'HH:mm');

    // storing sections in a list for each day.  Will set the state as this, and render onto the DOM when there are values in there.
    let monSections = [];
    let tueSections = [];
    let wedSections = [];
    let thuSections = [];
    let friSections = [];

    let prevCourse = allSections[0]['simple_name'];
    colorsIdx = 0;
    let colorObj = colors[colorsIdx++];

    for (let i = 0; i < allSections.length; i++) {
      let currSection = allSections[i];
      if (currSection === null) {
        // in the case of LECT for BIO-1L
        continue; // skip that section
      }
      let currCourse = currSection['simple_name'];
      if (prevCourse !== currCourse) {
        // get new color
        if (colorsIdx === colors.length) {
          colorsIdx = 0;
        }
        colorObj = colors[colorsIdx++];
        prevCourse = currCourse;
      }
      // get new color index when we encounter a change in course.


      // the following code does a calculation to find the offset of the section square
      // as well as the height based on how the calendar is structured.
      let timeRanges = convertTimeStringTo24(currSection['hours']);
      if (timeRanges === 'TBD') {
        continue;
      }
      timeRanges = timeRanges.split('-');
      let sectionStart = moment(timeRanges[0], 'HH:mm');
      let offset = ((sectionStart.diff(startHr, 'hours', true)) * HOUR_SLOT_HEIGHT) + 10; // 10 original top offset in px and 50 for height of each hr-row

      let sectionEnd = moment(timeRanges[1], 'HH:mm');
      let difference = sectionEnd.diff(sectionStart, 'hours', true);
      let height = difference * HOUR_SLOT_HEIGHT; // 50px * height for event

      // now that we have the offset and height, we can place into the calendar by inserting as a child of mon, tues, wedn, etc. column
      let days = currSection['days'];

      for (let j = 0; j < days.length; j++) {
        let currChar = days.charAt(j);

        // create new element with computed offset and height of section div.

        let newEventStyle = {
          top: `${offset}px`,
          backgroundColor: colorObj.bg,
          borderLeft: `4px solid ${colorObj.border}`,
          height: `${height}px`,
        };

        let newEventTextStyle = {
          color: colorObj.text,
        }
        const split = currSection['course_id'].split('-');
        const sectionID = currSection['course_id'];
        const sectionType = currSection['type'];
        let newEventDOMelement = (
          <div key={id++} style={newEventStyle} className="cal-event">
            <div style={newEventTextStyle} className="cal-event__text">
              <div className="title">
                {sectionID}
              </div>
              <div className="detail">
                {sectionType}
              </div>
            </div>
          </div>
        );
        switch (currChar) {
          case 'M':
            monSections.push(newEventDOMelement);
            break;
          case 'T':
            tueSections.push(newEventDOMelement);
            break;
          case 'W':
            wedSections.push(newEventDOMelement);
            break;
          case 'R':
            thuSections.push(newEventDOMelement);
            break;
          case 'F':
            friSections.push(newEventDOMelement);
            break;
          default:
            break;
        }
      }
    }

    return {
      mondaySections: monSections,
      tuesdaySections: tueSections,
      wednesdaySections: wedSections,
      thursdaySections: thuSections,
      fridaySections: friSections,
    };

  };

  handleLeftArrowButton = () => {

    let currIdx;
    if (this.props.currIndex >= 0) {
      currIdx = this.props.currIndex;
    }
    else {
      currIdx = this.state.currIndex;
    }

    const numValidSchedules = this.props.validSchedules.length;
    if (currIdx == 0) {
      currIdx = numValidSchedules - 1;
    }
    else {
      currIdx -= 1;
    }

    // update event placement
    const currSchedule = this.props.validSchedules[currIdx];
    const sectionsList = extractSectionsFromSchedule(currSchedule);

    const earliest = currSchedule['info']['earliest'];
    const start = (Math.floor(earliest/100)*100)/100;

    this.setState(() => ({ currIndex: currIdx }));

    if (this.props.updateCurrSchedule) {
      this.props.updateCurrSchedule(currSchedule, currIdx);
    }



  };

  handleRightArrowButton = () => {

    let currIdx;
    if (this.props.currIndex >= 0) {
      currIdx = this.props.currIndex;
    }
    else {
      currIdx = this.state.currIndex;
    }

    const numValidSchedules = this.props.validSchedules.length;
    if (currIdx == numValidSchedules-1) {
      currIdx = 0;
    }
    else {
      currIdx += 1;
    }

    const currSchedule = this.props.validSchedules[currIdx];
    const sectionsList = extractSectionsFromSchedule(currSchedule);

    const earliest = currSchedule['info']['earliest'];
    const start = (Math.floor(earliest/100)*100)/100;


    this.setState(() => ({ currIndex: currIdx }));

    if (this.props.updateCurrSchedule) {
      this.props.updateCurrSchedule(currSchedule, currIdx);
    }

  };

  render() {
    if (!this.props.validSchedules) {
      return <div className="schedules__container">Loading...</div>;
    }
    let currIdx;
    if (this.props.currIndex >= 0) {
      currIdx = this.props.currIndex;
    }
    else {
      currIdx = this.state.currIndex;
    }

    const currSchedule = this.props.validSchedules[currIdx];
    const numValidSchedules = this.props.validSchedules.length;

    const earliest = currSchedule['info']['earliest'];
    const latest = currSchedule['info']['latest'];
    const start = (Math.floor(earliest/100)*100)/100;
    const end = (Math.ceil(latest/100)*100)/100 + 1;

    const weekSections = this.placeSectionsIntoCalendar(start, extractSectionsFromSchedule(currSchedule));

    return (
      <div className="schedules__container">
        <div className="schedules__buttons-container">
          <div className="arrow-buttons__wrapper">
            <Button
              className="arrow-button"
              color='blue'
              size='small'
              onClick={() => { this.handleLeftArrowButton() }}
            >
              Prev
            </Button>
            <h5 className="valid-schedule__counter">{currIdx+1}/{numValidSchedules}</h5>
            <Button
              className="arrow-button"
              color='blue'
              size='small'
              onClick={() => { this.handleRightArrowButton() }}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="calendar__top-header-divider"></div>
        <WeeklyCalendarHeader />
        <WeeklyCalendarView
          monSections={weekSections['mondaySections']}
          tueSections={weekSections['tuesdaySections']}
          wedSections={weekSections['wednesdaySections']}
          thuSections={weekSections['thursdaySections']}
          friSections={weekSections['fridaySections']}
          currSchedule={currSchedule}
          startTime={start}
          endTime={end}
        />

      </div>
    );
  }
}

export default Schedules;
