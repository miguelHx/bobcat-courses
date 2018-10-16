import {Button} from "semantic-ui-react";
import React from "react";
import {extractSectionsFromSchedule} from "../../utils/WeeklyCalendarUtils";
import BobcatCoursesApi from "../../api/BobcatCoursesApi";
import AuthService from "../../login/AuthService";
import {toast} from "react-toastify";
import {TOAST_OPTIONS} from "../../utils/ToastOptions";
import {setCurrSavedScheduleIndex} from "../../react-redux/actions/currSavedScheduleIndex";
import PropTypes from 'prop-types';
import './DeleteScheduleButton.css';


const deleteSchedule = (schedule) => {
  let crns = [];
  const sectionsList = extractSectionsFromSchedule(schedule);

  for (let i = 0; i < sectionsList.length; i++) {
    crns.push(sectionsList[i]['crn']);
  }

  const scheduleTerm = sectionsList[0]['term'];

  let data = JSON.stringify({
    crns: crns,
    term: scheduleTerm,
  });

  BobcatCoursesApi.deleteSavedSchedule(data, AuthService.getToken())
    .then(res => {
      const responseStatus = res;
      let currIdx = this.props.currSavedScheduleIndex;
      const newLength = this.state.savedSchedules.length - 1;
      // on success, delete schedule from local state
      if (responseStatus['success']) {
        // schedule deleted, so notify user via Alert
        toast.info("Schedule Deleted. ❌", TOAST_OPTIONS);
        // then update state accordingly
        if (newLength === 0) {
          this.setState(() => ({
            savedSchedules: [],
            error: 'No saved schedules.'
          }));
        }
        else {
          // this means that there exists some saved schedules stored on the backend.

          // if index points to edge of array, then decrement by one to avoid going out of bounds.
          if (currIdx === newLength) {
            currIdx = newLength-1;
            this.props.dispatch(setCurrSavedScheduleIndex(currIdx));
          }


          // fetch new schedules list after the deletion via api call just like in componentDidMount but with extra checks for index update.
          BobcatCoursesApi.fetchSavedSchedules(AuthService.getToken())
            .then(response => {
              const data = response;

              this.setState(() => ({
                currSchedule: data[currIdx],
                savedSchedules: data,
                error: undefined
              }));
            })
            .catch(error => {
              toast.error(error, TOAST_OPTIONS);
              // console.log(error);
            });
        }

      }
      else {
        // error, schedule probably deleted, update state error Message
        toast.error(responseStatus['error'], TOAST_OPTIONS);
      }
    })
    .catch(error => {
      // console.log(error);
      toast.error(error, TOAST_OPTIONS);
    });

};

// want the following props:
// a currSchedule
const DeleteScheduleButton = (props) => {
  return (
    <div className='delete-schedule-button'>
      <Button onClick={() => { deleteSchedule(props.currSchedule) }} negative>Delete</Button>
    </div>
  );
};

DeleteScheduleButton.propTypes = {
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


export default DeleteScheduleButton;