import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import AuthService from "../../login/AuthService";
import BobcatCoursesApi from "../../api/BobcatCoursesApi";
import {extractSectionsFromSchedule} from "../../utils/WeeklyCalendarUtils";
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import { updateRefreshSavedScheduleBoolean } from '../../react-redux/actions/refreshSavedSchedule';
import PropTypes from 'prop-types';
import './SaveScheduleButton.css';
import {TOAST_OPTIONS} from "../../utils/ToastOptions";

const saveSchedule = (schedule, term, reduxDispatch) => {
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
        // want to notify user, return msg to SaveScheduleButton to display as a popup or alert.
        toast.success("Schedule Saved 😊", TOAST_OPTIONS);
        reduxDispatch(updateRefreshSavedScheduleBoolean(true));
      }
      else {
        // error, schedule probably exists, update state error Message
        let error;
        if (responseStatus['error_code'] === 104) {
          error = `Schedule already saved (#${responseStatus['schedule_index']+1})`;
        }
        else {
          error = responseStatus['error_description'];
        }
        toast.error(error, TOAST_OPTIONS);
      }
    })
    .catch(error => {
      // console.log(error);
      toast.error('An error has occurred. 😔', TOAST_OPTIONS);
    });
};

const SaveScheduleButton = (props) => {
  const { isLoggedIn, selectedTerm, currSchedule } = props;
  return (
    <div className="save-schedule-button">
      {/* if not logged in, render the button with popup, otherwise, render regular save schedule button */}
      { !isLoggedIn &&
        <Popup
          trigger={
                    <div className="app-root__popup-btn-wrapper">
                      <Button color='yellow' size='medium' disabled={!isLoggedIn} >Save</Button>
                    </div>
                  }
          content='You must be logged in to save schedules.'
        />
      }
      { isLoggedIn &&
        <Button
          onClick={() => { saveSchedule(currSchedule, selectedTerm.value, props.dispatch) }}
          color='yellow'
          disabled={!isLoggedIn}
          size='medium'
        >
          Save
        </Button>
      }
      <ToastContainer autoClose={3500}/>
    </div>
  );
};

SaveScheduleButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  selectedTerm: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  currSchedule: PropTypes.shape({
    custom_events: PropTypes.array,
    info: PropTypes.shape({
      earliest: PropTypes.number,
      gaps: PropTypes.number,
      latest: PropTypes.number,
      number_of_days: PropTypes.number,
    }),
    schedule: PropTypes.object,
  })
};

export default connect()(SaveScheduleButton);
