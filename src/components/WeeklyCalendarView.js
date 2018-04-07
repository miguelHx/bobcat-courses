import React from 'react';

let id = 0;

// maybe add testing for this funcion to handle all types of errors
const convert24to12HourFormat = (time24) => {
  // expecting numbers such as 7, 8, 9, 10, 11, 12, 13, 14 etc.
  if (time24 <= 12) {
    return time24;
  }
  else {
    return time24 - 12;
  }
}

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
          <div key={currTime} className="time">{currTime}</div>
        );
      })
    );
  };

  render() {
    console.log("[WEEKLY VIEW] current valid schedule: ", this.props.currSchedule);
    const earliest = this.props.currSchedule['info']['earliest'];
    const latest = this.props.currSchedule['info']['latest'];
    const start = (Math.floor(earliest/100)*100)/100 - 1;
    const end = (Math.ceil(latest/100)*100)/100 + 1;
    return (
      <div className="weekly-cal-view__container">
        <div className="weekly-cal-view__time-col">
          { this.renderTimes(start, end) }
        </div>
        <div className="weekly-cal-view__monday-col">
          { this.renderWeekColumnRows(end-start) }
        </div>
        <div className="weekly-cal-view__tuesday-col">
          { this.renderWeekColumnRows(end-start) }
        </div>
        <div className="weekly-cal-view__wednesday-col">
          { this.renderWeekColumnRows(end-start) }
        </div>
        <div className="weekly-cal-view__thursday-col">
          { this.renderWeekColumnRows(end-start) }
        </div>
        <div className="weekly-cal-view__friday-col">
          { this.renderWeekColumnRows(end-start) }
        </div>
      </div>
    );
  }
}
