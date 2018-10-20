import React from 'react';
import { Button } from 'semantic-ui-react';
import WeeklyCalendarHeader from './WeeklyCalendarHeader';
import WeeklyCalendarView from './WeeklyCalendarView';
import './Schedules.css';
import SaveScheduleButton from "../Buttons/SaveScheduleButton";
import SaveToCalendarButton from "../Buttons/SaveToCalendarButton";
import PropTypes from 'prop-types';
import DeleteScheduleButton from "../Buttons/DeleteScheduleButton";
import ScheduleSectionsList from './ScheduleSectionsList/ScheduleSectionsList';

class Schedules extends React.Component {
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
          {
            this.props.leftButton === 'save' ?
              (
                <SaveScheduleButton
                  isLoggedIn={this.props.isLoggedIn}
                  selectedTerm={this.props.selectedTerm}
                  currSchedule={currSchedule}
                />
              )
                : // otherwise
              (
                <DeleteScheduleButton deleteScheduleHandler={this.props.deleteSchedule} />
              )


          }

          <div className="arrow-buttons__wrapper">
            <Button.Group>
              <Button color="blue" icon='arrow left' onClick={() => { this.handleLeftArrowButton() }} />
              <Button disabled content={<span className="valid-schedule__counter">{currIdx + 1}/{numValidSchedules}</span>} />
              <Button color="blue" icon='arrow right' onClick={() => { this.handleRightArrowButton() }} />
            </Button.Group>
          </div>
          <SaveToCalendarButton currSchedule={currSchedule}/>
        </div>
        <div className="calendar__top-header-divider"></div>
        <WeeklyCalendarHeader />
        <WeeklyCalendarView
          currSchedule={currSchedule}
          startTime={start}
          endTime={end}
        />
        <h1 className="center-text">Sections Info</h1>
        <ScheduleSectionsList currSchedule={currSchedule} />
      </div>
    );
  }
}

Schedules.propTypes = {
  leftButton: PropTypes.oneOf(['save', 'delete']).isRequired
};

export default Schedules;