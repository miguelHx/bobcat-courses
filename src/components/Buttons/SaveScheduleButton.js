import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import AuthService from "../../login/AuthService";
import BobcatCoursesApi from "../../api/BobcatCoursesApi";
import {extractSectionsFromSchedule} from "../../utils/WeeklyCalendarUtils";
import Alert from 'react-s-alert';

const saveSchedule = (schedule, term) => {
  let crns = [];
  const sectionsList = extractSectionsFromSchedule(schedule);

  for (let i = 0; i < sectionsList.length; i++) {
    crns.push(sectionsList[i]['crn']);
  }

  let data = JSON.stringify({
    crns: crns,
    term: term,
  });

  BobcatCoursesApi.saveUserSchedule(data, AuthService.getToken())
    .then(res => {
      const responseStatus = res;
      if (responseStatus['success']) {
        // want to clear session storage of 'cached' saved schedules and index
        sessionStorage.removeItem("tempSavedSchedules");
        sessionStorage.removeItem("savedSchedulesIndex");
        // want to notify user, return msg to SaveScheduleButton to display as a popup or alert.
        Alert.success("Schedule Saved Successfully", {
          position: 'top-right',
          offset: 0,
        });
      }
      else {
        // error, schedule probably exists, update state error Message
        let error;
        if (responseStatus['type'] === 'already_exists') {
          error = `Schedule already saved (#${responseStatus['schedule_index']+1})`;
        }
        else {
          error = responseStatus['error'];
        }
        Alert.error(error, {
          position: 'top-right',
          offset: 0,
        });
      }
    })
    .catch(error => {
      // console.log(error);
      Alert.error('An error has occurred.', {
        position: 'top-right',
        offset: 0,
      });
    });
};

const SaveScheduleButton = (props) => {
  const { isLoggedIn, selectedTerm, currSchedule } = props;
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
          onClick={() => { saveSchedule(currSchedule, selectedTerm.value) }}
          color='yellow'
          disabled={!isLoggedIn}
        >
          Save Schedule
        </Button>
      }
      <Alert stack={{limit: 2}} timeout={2000} />
    </div>

  );
};

export default SaveScheduleButton;
