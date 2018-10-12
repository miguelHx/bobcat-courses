import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './SaveToCalendarButton.css';

const SaveToCalendarButton = (props) => {
  return (
    <div className='save-to-calendar-button'>
      <Button icon size='medium' color='teal'>
        <Icon name='calendar alternate outline' />
      </Button>
    </div>
  );
};

// SaveToCalendarButton.propTypes = {
//
// };


export default SaveToCalendarButton;
