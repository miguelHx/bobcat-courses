import React from 'react';
import { Button, Icon, Popup, List } from 'semantic-ui-react';
import './SaveToCalendarButton.css';
import GoogleCalListItem from "./SaveToCalendarListItems/GoogleCalListItem";
import MicrosoftCalListItem from "./SaveToCalendarListItems/MicrosoftCalListItem";
import GenericCalListItem from "./SaveToCalendarListItems/GenericCalListItem";

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
      <GoogleCalListItem />
      <MicrosoftCalListItem />
      <GenericCalListItem />
    </List>
  </Popup>
);

// SaveToCalendarButton.propTypes = {
//
// };


export default PopupWithSaveToCalendarButton;
