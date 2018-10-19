import React from 'react';
import {Form, Button, Checkbox, Message} from 'semantic-ui-react';
import { CUSTOM_EVENT_TIMES } from "../../utils/TimeOptions";
import { connect } from 'react-redux';
import {addCustomEvent, editCustomEvent} from "../../react-redux/actions/customEvents";
import { toast } from 'react-toastify';
import {TOAST_OPTIONS} from "../../utils/ToastOptions";
import PropTypes from 'prop-types';

// a sample event object:
/*
{
  event_name: "cse",
  start_time: 700,
  end_time: 830,
  days: "T",
}
 */

class CustomEventForm extends React.Component {

  state = {
    event_name: '',
    start_time: null,
    end_time: null,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    error: '',
  };

  handleUserInput = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value, error: '' }));
  };

  handleStartTimeChange = (event, { value }) => { this.setState({ start_time: value, error: '' }); };

  handleEndTimeChange = (event, { value }) => { this.setState({ end_time: value, error: '' }); };

  handleCheckBoxChange = (event, { value }) => {
    let key = '';
    switch (value) {
      case 'M':
        key = 'mon';
        break;
      case 'T':
        key = 'tue';
        break;
      case 'W':
        key = 'wed';
        break;
      case 'R':
        key = 'thu';
        break;
      case 'F':
        key = 'fri';
        break;
      default:
        return;
    }
    this.setState({ [key]: !this.state[key], error: '' });
  };

  /**
   * Checks if custom event is already in the list and if it
   * overlaps in days
   * @param customEvent - event object that we want to check
   * @param customEventsList - list to check if customEvent is in
   */
  doesCustomEventExist = (customEvent, customEventsList) => {
    for (let i = 0; i < customEventsList.length; i++) {
      let currCustomEvent = customEventsList[i];
      if (
        customEvent.event_name === currCustomEvent.event_name &&
        customEvent.start_time === currCustomEvent.start_time &&
        customEvent.end_time === currCustomEvent.end_time &&
        currCustomEvent.days.includes(customEvent.days)
      ) {
        // match
        return true;
      }
    }
    return false;
  };

  handleCreateMode = (newCustomEvent, customEvents) => {
    if (this.doesCustomEventExist(newCustomEvent, customEvents)) {
      this.setState({ error: 'This Custom Event Already Exists or There are Overlapping Day(s).' });
      return;
    }
    // once we pass all checks, want to dispatch action to redux store with new custom event object.
    this.props.dispatch(addCustomEvent(newCustomEvent));
    this.props.closeModal();
    toast.success("Custom Event Added 😎", TOAST_OPTIONS);
  };

  handleEditMode = (oldCustomEvent, newCustomEvent) => {
    this.props.dispatch(editCustomEvent(oldCustomEvent, newCustomEvent));
    this.props.closeModal();
    toast.success("Custom Event Edited ✍️", TOAST_OPTIONS);
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    // want to do some error checking.
    const { event_name, start_time, end_time } = this.state;
    if (event_name === '') {
      this.setState({ error: 'You must enter an event name to proceed.' });
      return;
    }
    const maxEventNameLength = 20;
    if (event_name.length > maxEventNameLength) {
      this.setState({ error: 'Event name is too long.' });
      return;
    }
    if (start_time === null || end_time === null) {
      this.setState({ error: 'Start Time or End Time has not been chosen.' });
      return;
    }
    // start time MUST NOT be after end time
    if (end_time <= start_time) {
      this.setState({ error: 'Start Time must be before End Time.' });
      return;
    }
    const { mon, tue, wed, thu, fri } = this.state;
    if ( !(mon || tue || wed || thu || fri) ) {
      this.setState({ error: 'You must choose at least one day of the week' });
      return;
    }
    let daysString = '';
    if (mon) {
      daysString = daysString.concat('M');
    }
    if (tue) {
      daysString = daysString.concat('T');
    }
    if (wed) {
      daysString = daysString.concat('W');
    }
    if (thu) {
      daysString = daysString.concat('R');
    }
    if (fri) {
      daysString = daysString.concat('F');
    }
    // one last check, does the custom event already exist in the store?
    const newCustomEvent = {
      event_name,
      start_time,
      end_time,
      days: daysString,
    };
    const { customEvents } = this.props;
    if (this.props.mode === "create") {
      this.handleCreateMode(newCustomEvent, customEvents);
    }
    else if (this.props.mode === "edit") {
      this.handleEditMode(this.props.customEventObject, newCustomEvent);
    }
  };

  render() {
    const { event_name, error } = this.state;
    const { mode } = this.props;
    return (
      <Form onSubmit={this.handleFormSubmit}>
        {
          error &&  <Message size='small' negative>
            <h4>{error}</h4>
          </Message>
        }
        <Form.Field inline>
          <label>Event Name</label>
          <input
            required
            placeholder="Event Name"
            name="event_name"
            type="text"
            value={event_name}
            onChange={this.handleUserInput}
          />
        </Form.Field>
        <Form.Group>
          <Form.Select
            label='Start Time: '
            options={CUSTOM_EVENT_TIMES}
            default={CUSTOM_EVENT_TIMES[0]}
            placeholder='Time'
            compact
            inline
            onChange={this.handleStartTimeChange}
          />
          <Form.Select
            label='End Time: '
            options={CUSTOM_EVENT_TIMES}
            default={CUSTOM_EVENT_TIMES[1]}
            placeholder={'Time'}
            compact
            inline
            onChange={this.handleEndTimeChange}
          />
        </Form.Group>
        <Form.Group inline>
          <label>Days: </label>
          <Form.Field>
            <Checkbox
              label='Mon'
              value='M'
              onClick={this.handleCheckBoxChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label='Tue'
              value='T'
              onClick={this.handleCheckBoxChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label='Wed'
              value='W'
              onClick={this.handleCheckBoxChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label='Thu'
              value='R'
              onClick={this.handleCheckBoxChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label='Fri'
              value='F'
              onClick={this.handleCheckBoxChange}
            />
          </Form.Field>
        </Form.Group>
        {
          mode === "create" ?
            (<Button color='green'>Add Custom Event</Button>)
            :
            (<Button color='orange'>Edit Custom Event</Button>)
        }

      </Form>
    );
  }
}

CustomEventForm.propTypes = {
  mode: PropTypes.oneOf(['edit', 'create']).isRequired,
  customEventObject: PropTypes.shape({
    event_name: PropTypes.string,
    start_time: PropTypes.number,
    end_time: PropTypes.number,
    days: PropTypes.string,
  })
};

const mapStateToProps = (state) => {
  return {
    customEvents: state.customEvents
  }
};

export default connect(mapStateToProps)(CustomEventForm);
