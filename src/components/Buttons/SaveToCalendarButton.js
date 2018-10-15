import React from 'react';
import { Button, Icon, Popup, List } from 'semantic-ui-react';
import './SaveToCalendarButton.css';
import GoogleCalListItem from "./SaveToCalendarListItems/GoogleCalListItem";
import MicrosoftCalListItem from "./SaveToCalendarListItems/MicrosoftCalListItem";
import GenericCalListItem from "./SaveToCalendarListItems/GenericCalListItem";
import PropTypes from 'prop-types';

const SaveToCalendarButton = (props) => {
  return (
    <div {...props} className='save-to-calendar-button'>
      <Button icon size='medium' color='teal'>
        <Icon name='calendar alternate outline' />
      </Button>
    </div>
  );
};

const PopupWithSaveToCalendarButton = (props) => (
  <Popup
    trigger={<SaveToCalendarButton/>}
    on='click'
    position='right center'
  >
    <h4>Save to Your Calendar</h4>
    <List selection verticalAlign='middle' divided>
      <GoogleCalListItem currSchedule={props.currSchedule} />
      <MicrosoftCalListItem currSchedule={props.currSchedule} />
      <GenericCalListItem currSchedule={props.currSchedule} />
    </List>
  </Popup>
);

PopupWithSaveToCalendarButton.propTypes = {
  currSchedule: PropTypes.shape({
    custom_events: PropTypes.array,
    info: PropTypes.shape({
      earliest: PropTypes.number,
      gaps: PropTypes.number,
      latest: PropTypes.number,
      number_of_days: PropTypes.number,
    }),
    schedule: PropTypes.object,
  }).isRequired
};


export default PopupWithSaveToCalendarButton;
