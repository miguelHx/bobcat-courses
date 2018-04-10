import React from 'react';
import { convert24to12HourFormat } from './../lib/WeeklyCalendarUtils';

let id = 0;

export default class WeeklyCalendarView extends React.Component {

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
    // console.log("[WEEKLY VIEW] current valid schedule: ", this.props.currSchedule);
    // console.log("[weekly view] STATE: ", this.state);
    const startTime = this.props.startTime;
    const endTime = this.props.endTime;

    const monSections = this.props.monSections;
    const tueSections = this.props.tueSections;
    const wedSections = this.props.wedSections;
    const thuSections = this.props.thuSections;
    const friSections = this.props.friSections;

    return (
      <div className="weekly-cal-view__container">
        <div className="weekly-cal-view__time-col">
          { this.renderTimes(startTime, endTime) }
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
          { this.renderWeekColumnRows(endTime-startTime) }
          { this.renderSections(monSections) }

        </div>
        <div className="weekly-cal-view__tuesday-col" id="tuesday">
          { this.renderWeekColumnRows(endTime-startTime) }
          { this.renderSections(tueSections) }
        </div>
        <div className="weekly-cal-view__wednesday-col" id="wednesday">
          { this.renderWeekColumnRows(endTime-startTime) }
          { this.renderSections(wedSections) }
        </div>
        <div className="weekly-cal-view__thursday-col" id="thursday">
          { this.renderWeekColumnRows(endTime-startTime) }
          { this.renderSections(thuSections) }
        </div>
        <div className="weekly-cal-view__friday-col" id="friday">
          { this.renderWeekColumnRows(endTime-startTime) }
          { this.renderSections(friSections) }
        </div>
      </div>
    );
  }
}
