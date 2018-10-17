import {Button} from "semantic-ui-react";
import React from "react";
import PropTypes from 'prop-types';
import './DeleteScheduleButton.css';


// want the following props:
// a currSchedule
const DeleteScheduleButton = (props) => {
  return (
    <div className='delete-schedule-button'>
      <Button onClick={props.deleteScheduleHandler} negative>Delete</Button>
    </div>
  );
};

DeleteScheduleButton.propTypes = {
  deleteScheduleHandler: PropTypes.func.isRequired
};

export default DeleteScheduleButton;
