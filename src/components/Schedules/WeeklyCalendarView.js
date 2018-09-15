import React from 'react';
import moment from "moment";
import { Popup } from "semantic-ui-react";
import CalendarEvent from "./CalendarEvent";
import {
  convertTimeStringTo24,
  extractSectionsFromSchedule,
  convert24to12HourFormat
} from '../../utils/WeeklyCalendarUtils';
import './WeeklyCalendarView.css';

const HOUR_SLOT_HEIGHT = 45;
const TOP_OFFSET = 10;
let colorsIdx = 0;

let colors = [
  { bg: '#bfecff', border: '#34aadc', text: '#1f6583' }, // blue
  { bg: '#fff2bf', border: '#ffcc00', text: '#a68500' }, // yellow
  { bg: '#f3bfff', border: '#cc73e1', text: '#7b4488' }, // purple
  { bg: '#ffbfcb', border: '#ff2d55', text: '#a61d37' }, // red
  { bg: '#ffe5bf', border: '#ff9500', text: '#a66100' }, // orange
  { bg: '#d1ffbf', border: '#65db39', text: '#3c8222' }, // green
  { bg: '#e0d3c1', border: '#a2845e', text: '#4d3c26' }, // brown
];

export default class WeeklyCalendarView extends React.Component {

  generateCalendarEvents = (startingHour, allSections) => {
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
      let offset = ((sectionStart.diff(startHr, 'hours', true)) * HOUR_SLOT_HEIGHT) + TOP_OFFSET; // 10 original top offset in px and 50 for height of each hr-row

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
        };
        const sectionID = currSection['course_id'];
        const sectionType = currSection['type'];
        // want event element to contain more details on hover
        let newEventDOMelement = (
          <CalendarEvent
            key={`${sectionID}-${sectionType}`}
            eventstyle={newEventStyle}
            textstyle={newEventTextStyle}
            title={sectionID}
            detail={sectionType}
          />
        );
        let popupElement = (
          <Popup key={`${sectionID}-${sectionType}-popup`} trigger={newEventDOMelement}>
            <p className="popup-info"><b>{currSection['course_name']}</b></p>
            <p className="popup-info">Hours: {currSection['hours']}</p>
            <p className="popup-info">Location: {currSection['room']}</p>
            <p className="popup-info">CRN: {currSection['crn']}</p>
            <p className="popup-info">Instructor: {currSection['instructor']}</p>
            <p className="popup-info">Enrolled: {currSection['enrolled']}/{currSection['capacity']}</p>
          </Popup>
        );
        switch (currChar) {
          case 'M':
            monSections.push(popupElement);
            break;
          case 'T':
            tueSections.push(popupElement);
            break;
          case 'W':
            wedSections.push(popupElement);
            break;
          case 'R':
            thuSections.push(popupElement);
            break;
          case 'F':
            friSections.push(popupElement);
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

  renderWeekColumnRows = (numRowsToRender) => {
    let times = [];
    for (let i = 0; i <= numRowsToRender; i++) {
      times.push(i);
    }
    return (
      times.map((time) => {
        return (
          <div key={`weekly-${time}`} className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
        );
      })
    );
  };

  renderTimes = (start, end) => {
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
          <div key={time} className="time">{currTime}</div>
        );
      })
    );
  };

  renderSections = (sections) => {
    // return array of divs based on day

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
    const { startTime, endTime, currSchedule } = this.props;
    const allSections = extractSectionsFromSchedule(currSchedule);
    const dayOfWeekEvents = this.generateCalendarEvents(startTime, allSections);
    return (
      <div className="weekly-cal-view__container">
        <div className="weekly-cal-view__time-col">
          { this.renderTimes(startTime, endTime) }
        </div>
        <div className="weekly-cal-view__monday-col" id="monday">
          { this.renderWeekColumnRows(endTime-startTime) }
          { this.renderSections(dayOfWeekEvents['mondaySections']) }
        </div>
        <div className="weekly-cal-view__tuesday-col" id="tuesday">
          { this.renderWeekColumnRows(endTime-startTime) }
          { this.renderSections(dayOfWeekEvents['tuesdaySections']) }
        </div>
        <div className="weekly-cal-view__wednesday-col" id="wednesday">
          { this.renderWeekColumnRows(endTime-startTime) }
          { this.renderSections(dayOfWeekEvents['wednesdaySections']) }
        </div>
        <div className="weekly-cal-view__thursday-col" id="thursday">
          { this.renderWeekColumnRows(endTime-startTime) }
          { this.renderSections(dayOfWeekEvents['thursdaySections']) }
        </div>
        <div className="weekly-cal-view__friday-col" id="friday">
          { this.renderWeekColumnRows(endTime-startTime) }
          { this.renderSections(dayOfWeekEvents['fridaySections']) }
        </div>
      </div>
    );
  }
}
