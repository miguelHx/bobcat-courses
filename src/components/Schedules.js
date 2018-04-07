import React from 'react';
import ReactDOM from 'react-dom';

class Schedules extends React.Component {
  render() {
    if (!this.props.validSchedules) {
      return <div className="schedules__container">Loading...</div>;
    }
    return (
      <div className="schedules__container">
        <div className="calendar__top-header-divider"></div>
        <div className="calendar-header__row">
          <div className="time-header"></div>
          <div className="calendar-header__row-title">Mon</div>
          <div className="calendar-header__row-title">Tue</div>
          <div className="calendar-header__row-title">Wed</div>
          <div className="calendar-header__row-title">Thu</div>
          <div className="calendar-header__row-title">Fri</div>
        </div>
        <div className="weekly-cal-view__container">
          <div className="weekly-cal-view__time-col">
            <div className="time">7</div>
            <div className="time">8</div>
            <div className="time">9</div>
            <div className="time">10</div>
            <div className="time">11</div>
            <div className="time">Noon</div>
            <div className="time">1</div>
            <div className="time">2</div>
            <div className="time">3</div>
            <div className="time">4</div>
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

      </div>
    );
  }
}

export default Schedules;
