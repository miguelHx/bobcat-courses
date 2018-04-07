import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon } from 'semantic-ui-react';
import WeeklyCalendarHeader from './WeeklyCalendarHeader';
import WeeklyCalendarView from './WeeklyCalendarView';

class Schedules extends React.Component {
  state = {
    currIndex: 0,
  }

  render() {
    if (!this.props.validSchedules) {
      return <div className="schedules__container">Loading...</div>;
    }
    const currIdx = this.state.currIndex;
    const numValidSchedules = this.props.validSchedules.length;
    return (
      <div className="schedules__container">
        <div className="schedules__buttons-container">
          <div className="arrow-buttons__wrapper">
            <Button className="arrow-button" icon color='blue' size='mini'>
              <Icon name='left arrow' />
            </Button>
            <h5 className="valid-schedule__counter">{currIdx+1}/{numValidSchedules}</h5>
            <Button className="arrow-button" icon color='blue' size='mini'>
              <Icon name='right arrow' />
            </Button>
          </div>
        </div>
        <div className="calendar__top-header-divider"></div>
        <WeeklyCalendarHeader />
        <WeeklyCalendarView currSchedule={this.props.validSchedules[currIdx]} />

      </div>
    );
  }
}

export default Schedules;
