import React from 'react';
import { Button, Popup } from 'semantic-ui-react';

const SaveScheduleButton = (props) => {
  const { isLoggedIn, saveSchedule } = props;
  return (
    <div>
      {/* if not logged in, render the button with popup, otherwise, render regular save schedule button */}
      { !isLoggedIn &&
        <Popup
          trigger={
                    <div className="app-root__popup-btn-wrapper">
                      <Button color='yellow' size='small' disabled={!isLoggedIn} >Save Schedule</Button>
                    </div>
                  }
          content='You must be logged in to save schedules.'
        />
      }
      { isLoggedIn &&
        <Button
          onClick={saveSchedule}
          color='yellow'
          disabled={!isLoggedIn}
        >
          Save Schedule
        </Button>
      }
    </div>

  );
};

export default SaveScheduleButton;
