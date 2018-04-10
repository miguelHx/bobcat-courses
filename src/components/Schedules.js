import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Button, Icon } from 'semantic-ui-react';
import { extractSectionsFromSchedule } from './../lib/WeeklyCalendarUtils';
import { convertTimeStringTo24 } from './../lib/WeeklyCalendarUtils';
import WeeklyCalendarHeader from './WeeklyCalendarHeader';
import WeeklyCalendarView from './WeeklyCalendarView';

let id = 1000;

let colors = [
  { bg: '#f3bfff', border: '#cc73e1', text: '#7b4488' }, // purple
  { bg: '#fff2bf', border: '#ffcc00', text: '#a68500' }, // yellow
  { bg: '#bfecff', border: '#34aadc', text: '#1f6583' }, // blue
  { bg: '#ffbfcb', border: '#ff2d55', text: '#a61d37' }, // red
  { bg: '#ffe5bf', border: '#ff9500', text: '#a66100' }, // orange
  { bg: '#d1ffbf', border: '#65db39', text: '#3c8222' }, // green
  { bg: '#e0d3c1', border: '#a2845e', text: '#4d3c26' }, // brown
];

class Schedules extends React.Component {
  state = {
    currIndex: 0,
    mondaySections: [],
    tuesdaySections: [],
    wednesdaySections: [],
    thursdaySections: [],
    fridaySections: [],
  };

  componentDidMount() {
    // initial rendering of sections onto page
    console.log("COMPONENT DID MOUNT");
    const currIdx = this.state.currIndex;
    const currSchedule = this.props.validSchedules[currIdx];
    const sectionsList = extractSectionsFromSchedule(currSchedule);

    const earliest = currSchedule['info']['earliest'];
    const start = (Math.floor(earliest/100)*100)/100 - 1;
    this.placeSectionsIntoCalendar(start, sectionsList, 0);
  }


  placeSectionsIntoCalendar = (startingHour, allSections, indexUpdate) => {
    console.log("INSIDE PLACE SECTIONS INTO CALENDAR");

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

    console.log("starting hour: ", startHr);
    console.log("all sections: ", allSections);
    // storing sections in a list for each day.  Will set the state as this, and render onto the DOM when there are values in there.
    let monSections = [];
    let tueSections = [];
    let wedSections = [];
    let thuSections = [];
    let friSections = [];

    for (let i = 0; i < allSections.length; i++) {
      let currSection = allSections[i];
      // the following code does a calculation to find the offset of the section square
      // as well as the height based on how the calendar is structured.
      let timeRanges = convertTimeStringTo24(currSection['hours']).split('-');
      let sectionStart = moment(timeRanges[0], 'HH:mm');
      let offset = ((sectionStart.diff(startHr, 'hours', true)) * 50) + 10; // 10 original top offset in px and 50 for height of each hr-row
      console.log("LOOK HERE:");
      console.log("time ranges: ", timeRanges);
      console.log("start: ", sectionStart);
      console.log("startHr: ", startHr);
      console.log("OFFSET: ", offset);


      let sectionEnd = moment(timeRanges[1], 'HH:mm');
      let difference = sectionEnd.diff(sectionStart, 'hours', true);
      let height = difference * 50; // 50px * height for event
      console.log("height diff: ", difference);

      console.log("time ranges: ", timeRanges); // if 1530 - 1620, expect 0.83333

      // now that we have the offset and height, we can place into the calendar by inserting as a child of mon, tues, wedn, etc. column
      let days = currSection['days'];

      for (let j = 0; j < days.length; j++) {
        let currChar = days.charAt(j);

        // create new element with computed offset and height of section div.
        let newElementEventStyle = {
          display: 'block',
          top: `${offset}px`,
          backgroundColor: '#fff2bf',
          borderLeft: '4px solid black',
          height: `${height}px`,
          width: '100%',
          opacity: '0.6',
          position: 'absolute',
          zIndex: '1',
        };

        let newElementTextStyle = {
          fontSize: '13px',
          fontWeight: '500',
          lineHeight: '14px',
          padding: '4px 6px 4px 6px',
          wordBreak: 'break-word'
        }


        let newElement = (
          <div key={id++} style={newElementEventStyle}>
            <div className="text">
              <div className="title">
                {currSection['course_id']}
              </div>
              <div className="location">
                {currSection['location']}
              </div>
            </div>
          </div>
        );
        switch (currChar) {
          case 'M':
            monSections.push(newElement);
            break;
          case 'T':
            tueSections.push(newElement);
            break;
          case 'W':
            wedSections.push(newElement);
            break;
          case 'R':
            thuSections.push(newElement);
            break;
          case 'F':
            friSections.push(newElement);
            break;
          default:
            break;
        }
      }
    }

    this.setState(() => ({
      mondaySections: monSections,
      tuesdaySections: tueSections,
      wednesdaySections: wedSections,
      thursdaySections: thuSections,
      fridaySections: friSections,
      currIndex: indexUpdate,
    }));

  };

  handleLeftArrowButton = () => {

    let currIdx = this.state.currIndex;

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
    const start = (Math.floor(earliest/100)*100)/100 - 1;

    this.placeSectionsIntoCalendar(start, sectionsList, currIdx);





  };

  handleRightArrowButton = () => {

    let currIdx = this.state.currIndex;

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
    const start = (Math.floor(earliest/100)*100)/100 - 1;



    this.placeSectionsIntoCalendar(start, sectionsList, currIdx);




  };

  render() {
    console.log("RENDERING IN SCHEDULES.JS");
    if (!this.props.validSchedules) {
      return <div className="schedules__container">Loading...</div>;
    }

    const currIdx = this.state.currIndex;
    const currSchedule = this.props.validSchedules[currIdx];
    const numValidSchedules = this.props.validSchedules.length;

    const earliest = currSchedule['info']['earliest'];
    const latest = currSchedule['info']['latest'];
    const start = (Math.floor(earliest/100)*100)/100 - 1;
    const end = (Math.ceil(latest/100)*100)/100 + 1;

    return (
      <div className="schedules__container">
        <div className="schedules__buttons-container">
          <div className="arrow-buttons__wrapper">
            <Button
              className="arrow-button"
              icon
              color='blue'
              size='mini'
              onClick={() => { this.handleLeftArrowButton() }}
            >
              <Icon name='left arrow' />
            </Button>
            <h5 className="valid-schedule__counter">{currIdx+1}/{numValidSchedules}</h5>
            <Button
              className="arrow-button"
              icon
              color='blue'
              size='mini'
              onClick={() => { this.handleRightArrowButton() }}
            >
              <Icon name='right arrow' />
            </Button>
          </div>
        </div>
        <div className="calendar__top-header-divider"></div>
        <WeeklyCalendarHeader />
        <WeeklyCalendarView
          monSections={this.state.mondaySections}
          tueSections={this.state.tuesdaySections}
          wedSections={this.state.wednesdaySections}
          thuSections={this.state.thursdaySections}
          friSections={this.state.fridaySections}
          currSchedule={currSchedule}
          parentIdx={currIdx}
          startTime={start}
          endTime={end}
        />

      </div>
    );
  }
}

export default Schedules;
