import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { removeCustomEvent } from "../../../react-redux/actions/customEvents";
import PropTypes from 'prop-types';
import './CustomEvent.css';
import CustomEventModal from "../CustomEventModal";

const CustomEvent = (props) => {
  return (
    <div className="custom-event">
      <p className="custom-event__text">{props.customEventObject.event_name}</p>
      <div>
        <CustomEventModal mode='edit' customEventObject={props.customEventObject} />
        <Button
          size='mini'
          compact
          color='red'
          onClick={() => { props.dispatch(removeCustomEvent(props.customEventObject)) }}
        >
          X
        </Button>
      </div>
    </div>
  );
};

CustomEvent.propTypes = {
  customEventObject: PropTypes.shape({
    event_name: PropTypes.string,
    start_time: PropTypes.number,
    end_time: PropTypes.number,
    days: PropTypes.string,
  }).isRequired
};

export default connect()(CustomEvent);
