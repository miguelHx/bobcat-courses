import React from "react";
import './CalendarEvent.css';

const CalendarEvent = (props) => {
  return (
    <div {...props} style={props.eventStyle} className="cal-event">
      <div style={props.textStyle} className="cal-event__text">
        <div className="cal-event__title">
          {props.title}
        </div>
        <div className="cal-event__detail">
          {props.detail}
        </div>
      </div>
    </div>
  );
};

export default CalendarEvent;