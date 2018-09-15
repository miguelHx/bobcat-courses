import React from 'react';
import './WeeklyCalendarHeader.css';

const WeeklyCalendarHeader = () => {
  return (
    <div className="calendar-header__row">
      <div className="time-header"></div>
      <div className="calendar-header__row-title">Mon</div>
      <div className="calendar-header__row-title">Tue</div>
      <div className="calendar-header__row-title">Wed</div>
      <div className="calendar-header__row-title">Thu</div>
      <div className="calendar-header__row-title">Fri</div>
    </div>
  );
};

export default WeeklyCalendarHeader;
