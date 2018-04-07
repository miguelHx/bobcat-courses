import React from 'react';

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

  renderTimes = (minTime, maxTime) => {
    // min and max will come as 24-hour time.

    const start = (Math.floor(minTime/100)*100)/100 - 1;
    const end = (Math.ceil(maxTime/100)*100)/100 + 1;

    console.log(`Earliest time: ${start}, Latest time: ${end}`);





  }

  render() {
    return (
      <div className="weekly-cal-view__container">
        <div className="weekly-cal-view__time-col">
          { this.renderTimes(730, 1030) }
        </div>

        <div className="weekly-cal-view__monday-col">
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
        </div>
        <div className="weekly-cal-view__tuesday-col">
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
        </div>
        <div className="weekly-cal-view__wednesday-col">
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
        </div>
        <div className="weekly-cal-view__thursday-col">
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
        </div>
        <div className="weekly-cal-view__friday-col">
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
          <div className="weekly-hour-slot">
            <div className="weekly-hour__30min-dotted-line"></div>
          </div>
        </div>
      </div>
    );
  }
}
