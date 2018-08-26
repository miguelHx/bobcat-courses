import React from 'react';
import { Button } from 'semantic-ui-react';
import WeeklyCalendarHeader from './WeeklyCalendarHeader';
import WeeklyCalendarView from './WeeklyCalendarView';
import './Schedules.css';

export default class Schedules extends React.Component {
  state = {
    currIndex: 0,
  };

  componentDidMount() {
    // initial rendering of sections onto page
    const currIdx = this.props.currIndex || this.state.currIndex;
    const currSchedule = this.props.validSchedules[currIdx];
    // need to update parent class for deleting current schedule when clicking delete button.
    if (this.props.updateCurrSchedule) {
      this.props.updateCurrSchedule(currSchedule, currIdx);
    }
  }

  handleLeftArrowButton = () => {
    let currIdx;
    if (this.props.currIndex >= 0) {
      currIdx = this.props.currIndex;
    }
    else {
      currIdx = this.state.currIndex;
    }
    const numValidSchedules = this.props.validSchedules.length;
    if (currIdx === 0) {
      currIdx = numValidSchedules - 1;
    }
    else {
      currIdx -= 1;
    }

    // update event placement
    const currSchedule = this.props.validSchedules[currIdx];
    this.setState(() => ({ currIndex: currIdx }));

    if (this.props.updateCurrSchedule) {
      this.props.updateCurrSchedule(currSchedule, currIdx);
    }
  };

  handleRightArrowButton = () => {
    let currIdx;
    if (this.props.currIndex >= 0) {
      currIdx = this.props.currIndex;
    }
    else {
      currIdx = this.state.currIndex;
    }

    const numValidSchedules = this.props.validSchedules.length;
    if (currIdx === numValidSchedules-1) {
      currIdx = 0;
    }
    else {
      currIdx += 1;
    }
    const currSchedule = this.props.validSchedules[currIdx];
    this.setState(() => ({ currIndex: currIdx }));

    if (this.props.updateCurrSchedule) {
      this.props.updateCurrSchedule(currSchedule, currIdx);
    }
  };

  render() {
    if (!this.props.validSchedules) {
      return <div className="schedules__container">Loading...</div>;
    }
    let currIdx;
    if (this.props.currIndex >= 0) {
      currIdx = this.props.currIndex;
    }
    else {
      currIdx = this.state.currIndex;
    }
    const currSchedule = this.props.validSchedules[currIdx];
    const numValidSchedules = this.props.validSchedules.length;
    const earliest = currSchedule['info']['earliest'];
    const latest = currSchedule['info']['latest'];
    const start = (Math.floor(earliest/100)*100)/100;
    const end = (Math.ceil(latest/100)*100)/100 + 1;

    return (
      <div className="schedules__container">
        <div className="schedules__buttons-container">
          <div className="arrow-buttons__wrapper">
            <Button
              className="arrow-button"
              color='blue'
              size='small'
              onClick={() => { this.handleLeftArrowButton() }}
            >
              Prev
            </Button>
            <h5 className="valid-schedule__counter">{currIdx+1}/{numValidSchedules}</h5>
            <Button
              className="arrow-button"
              color='blue'
              size='small'
              onClick={() => { this.handleRightArrowButton() }}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="calendar__top-header-divider"></div>
        <WeeklyCalendarHeader />
        <WeeklyCalendarView
          currSchedule={currSchedule}
          startTime={start}
          endTime={end}
        />
      </div>
    );
  }
}