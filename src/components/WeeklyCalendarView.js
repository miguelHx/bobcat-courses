import React from 'react';
import moment from 'moment';
import { extractSectionsFromSchedule } from './../lib/WeeklyCalendarUtils';

let id = 0;



// maybe add testing for this funcion to handle all types of errors
const convert24to12HourFormat = (time24) => {
  // expecting numbers such as 7, 8, 9, 10, 11, 12, 13, 14 etc.
  if (time24 <= 12) {
    return `${time24}:00am`;
  }
  else {
    return `${time24 - 12}:00pm`;
  }
};

// time12 := 3:30-4:20pm for example.
const convertTimeStringTo24 = (time12) => {
  let parts = time12.split('-');// [3:30, 4:20pm]
  let startingHour = parseInt(parts[0].split(':')[0], 10);
  let startingMinutes = parts[0].split(':')[1];
  let endingHour = parseInt(parts[1].split(':')[0], 10);
  let endingMinutes = parts[1].split(':')[1].substring(0, 2);
  let AMorPM = parts[1].slice(-2); // am or pm
  if (AMorPM == 'pm') {
    if (endingHour > startingHour) {
      startingHour += 12;
      startingHour = startingHour.toString(10);
      endingHour += 12;
      endingHour = endingHour.toString(10);
    }
  }
  // put time period back together in 24 hour format.
  let time = `${startingHour}:${startingMinutes}-${endingHour}:${endingMinutes}`;
  return time;
}

export default class WeeklyCalendarView extends React.Component {

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
    const currSchedule = this.props.currSchedule;
    const sectionsList = extractSectionsFromSchedule(currSchedule);

    const earliest = currSchedule['info']['earliest'];
    const start = (Math.floor(earliest/100)*100)/100 - 1;

    this.placeSectionsIntoCalendar(start, sectionsList);
  }

  placeSectionsIntoCalendar = (startingHour, allSections) => {
    let startHr = (startingHour * 100).toString(10); // will be used for moment js

    let hr;
    if (startingHour < 10) {
       hr = startHr.substring(0, 1);
    }
    else {
      hr = `0${startHr.substring(0, 1)}`;
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
      let start = moment(timeRanges[0], 'HH:mm');
      let offset = ((start.diff(startHr, 'hours', true)) * 50) + 10; // 10 original top offset in px and 50 for height of each hr-row
      console.log("LOOK HERE:");
      console.log("time ranges: ", timeRanges);
      console.log("start: ", start);
      console.log("startHr: ", startHr);
      console.log("OFFSET: ", offset);


      let end = moment(timeRanges[1], 'HH:mm');
      let difference = end.diff(start, 'hours', true);
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
    }));

  };

  renderWeekColumnRows = (numRowsToRender) => {
    let times = [];
    for (let i = 0; i <= numRowsToRender; i++) {
      times.push(i);
    }

    return (
      times.map((time) => {
        return (
          <div key={id++} className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
        );
      })
    );
  };

  renderTimes = (start, end) => {
    console.log(`Earliest time: ${start}, Latest time: ${end}`);

    let times = [];
    for (let i = start; i <= end; i++) {
      times.push(i);
    }


    return (
      times.map((time) => {
        let currTime = time;
        if (currTime === 12) {
          currTime = 'Noon';
        }
        else {
          currTime = convert24to12HourFormat(time);
        }
        return (
          <div key={id++} className="time">{currTime}</div>
        );
      })
    );
  };

  renderSections = (day) => {
    // return array of divs based on day
    let sections = [];

    switch (day) {
      case 'mon':
        sections = this.state.mondaySections;
        break;
      case 'tue':
        sections = this.state.tuesdaySections;
        break;
      case 'wed':
        sections = this.state.wednesdaySections;
        break;
      case 'thu':
        sections = this.state.thursdaySections;
        break;
      case 'fri':
        sections = this.state.fridaySections;
        break;
    }

    // if empty, return invisible div.
    if (sections.length === 0) {
      return <div style={{ display: 'none' }}></div>;
    }
    // otherwise, return each section element
    return (
      sections.map((element) => {
        return element;
      })
    );
  };

  render() {
    console.log("[WEEKLY VIEW] current valid schedule: ", this.props.currSchedule);
    console.log("[weekly view] STATE: ", this.state);
    const earliest = this.props.currSchedule['info']['earliest'];
    const latest = this.props.currSchedule['info']['latest'];
    const start = (Math.floor(earliest/100)*100)/100 - 1;
    const end = (Math.ceil(latest/100)*100)/100 + 1;
    return (
      <div className="weekly-cal-view__container">
        <div className="weekly-cal-view__time-col">
          { this.renderTimes(start, end) }
        </div>
        <div className="weekly-cal-view__monday-col" id="monday">
          {/* <div className="event">
            <div className="text">
              <div className="title">
                CSE 111 LAB 02L
              </div>
              <div className="location">
                SCIENG 100
              </div>
            </div>
          </div> */}
          { this.renderWeekColumnRows(end-start) }
          { this.renderSections('mon') }

        </div>
        <div className="weekly-cal-view__tuesday-col" id="tuesday">
          { this.renderWeekColumnRows(end-start) }
          { this.renderSections('tue') }
        </div>
        <div className="weekly-cal-view__wednesday-col" id="wednesday">
          { this.renderWeekColumnRows(end-start) }
          { this.renderSections('wed') }
        </div>
        <div className="weekly-cal-view__thursday-col" id="thursday">
          { this.renderWeekColumnRows(end-start) }
          { this.renderSections('thu') }
        </div>
        <div className="weekly-cal-view__friday-col" id="friday">
          { this.renderWeekColumnRows(end-start) }
          { this.renderSections('fri') }
        </div>
      </div>
    );
  }
}
