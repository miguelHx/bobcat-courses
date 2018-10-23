import React from 'react';
import { connect } from 'react-redux';
import BobcatCoursesApi from "../../api/BobcatCoursesApi";
import {Loader, Message} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { extractSectionsFromSchedule } from '../../utils/WeeklyCalendarUtils';
import Schedules from '../Schedules/Schedules';
import AuthService from '../../login/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import { setCurrSavedScheduleIndex } from "../../react-redux/actions/currSavedScheduleIndex";
import { setSavedSchedules, clearSavedSchedules } from '../../react-redux/actions/savedSchedules';
import { updateRefreshSavedScheduleBoolean } from "../../react-redux/actions/refreshSavedSchedule";
import './SavedSchedulesPage.css';
import {TOAST_OPTIONS} from "../../utils/ToastOptions";

const Nav = (props) => {
  return (
    <NavLink
      exact
      {...props}
    />
  );
};

class SavedSchedulesPage extends React.Component {

  state = {
    currSchedule: {},
    currSavedScheduleIndex: this.props.currSavedScheduleIndex, // for getting correct index of updated schedule after delete.
    savedSchedules: this.props.savedSchedules, // by default, will be an empty array []
    error: undefined,
    loadingSchedules: false,
  };

  componentDidMount() {
    if (AuthService.loggedIn()) {
      if (this.props.savedSchedules.length !== 0 && !this.props.refreshSavedSchedule) {
        // if saved schedule is empty or refreshSavedSchedule is false, then return
        return;
      }
      this.setState({ loadingSchedules: true });
      // Otherwise, want to fetch schedule data if user is logged in
      BobcatCoursesApi.fetchSavedSchedules(AuthService.getToken())
        .then(response => {
        const data = response || [];
        if (data.length === 0) {
          this.setState(() => ({ error: 'No saved schedules.', loadingSchedules: false }));
          return;
        }
        const reversed = data.reverse();
        this.props.dispatch(setSavedSchedules(reversed));
        this.props.dispatch(setCurrSavedScheduleIndex(0));
        this.setState(() => ({ currSchedule: reversed[this.props.currSavedScheduleIndex], error: undefined, loadingSchedules: false }));
        // console.log(response.data);
      })
      .catch(error => {
        // add toast here to notify user
        console.log(error);
      });
      this.props.dispatch(updateRefreshSavedScheduleBoolean(false));
    }
  }

  deleteSchedule = () => {
    let crns = [];
    const schedule = this.state.currSchedule;
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
      const newLength = this.props.savedSchedules.length - 1;
      // on success, delete schedule from local state
      if (responseStatus['success']) {
        // first, notify user
        toast.info("Schedule Deleted. ❌", TOAST_OPTIONS);
        // then update state accordingly
        if (newLength === 0) {
          this.props.dispatch(clearSavedSchedules());
          this.setState(() => ({
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

          this.setState({ loadingSchedules: true });
          // fetch new schedules list after the deletion via api call just like in componentDidMount but with extra checks for index update.
          BobcatCoursesApi.fetchSavedSchedules(AuthService.getToken())
            .then(response => {
            const data = response || [];
              const reversed = data.reverse(); // reversing because data comes in backwards from the response.
              // order matters because when a user tries to save an already saved schedule, the backend will spit out the index.
              this.props.dispatch(setSavedSchedules(reversed));
            this.setState(() => ({
              currSchedule: reversed[currIdx],
              error: undefined,
              loadingSchedules: false,
            }));
          })
          .catch(error => {
            toast.error(error, TOAST_OPTIONS);
            this.setState({ loadingSchedules: false });
            // console.log(error);
          });
        }
      }
      else {
        // error, schedule probably deleted, update state error Message
        if (responseStatus['error_code'] === 105) {
          toast.error(responseStatus['error_description'], TOAST_OPTIONS);
        }
      }
    })
    .catch(error => {
      // console.log(error);
      toast.error(error, TOAST_OPTIONS);
    });

  };

  updateCurrSchedule = (schedule, index) => {
    this.props.dispatch(setCurrSavedScheduleIndex(index));
    this.setState(() => ({ currSchedule: schedule }));
  };


  render() {
    const { isLoggedIn } = this.props;
    // console.log("[saved schedules state]: ", this.state);
    const { error, loadingSchedules } = this.state;

    if (loadingSchedules) {
      return (
        <div className="saved-schedules__main-container">
          <h1 className="saved-schedules__header-text">Your Saved Schedules</h1>
          <div className="saved-schedules__loader-container">
            <Loader className='loader' active>Loading Saved Schedules...</Loader>
          </div>
          <ToastContainer autoClose={3500}/>
        </div>
      );
    }

    const { currSavedScheduleIndex } = this.props;
    // if not logged in, tell user that they must log in to see this page
    // provide them a link to login.
    // if user is logged in AND has saved some schedules, then render schedules onto screen along with options.
    return (
      // add a better layout
      <div className="saved-schedules__main-container">
        { isLoggedIn &&
          <div>
            { error &&  <div className="saved-schedules__warning-msg-wrapper">
                          <Message warning>
                            <h4>{error} Plan your schedule <Nav to="/">here </Nav>and then click the 'Save Schedule' button.</h4>
                          </Message>
                        </div>
            }

            {/* want to add some buttons, for now, just delete schedule button  */}

            {
              this.props.savedSchedules.length > 0 &&
              <div className="saved-schedules__schedules-display">
                <h1 className="saved-schedules__header-text">Your Saved Schedules</h1>
                {/*<GoogleCalButton currSchedule={this.state.currSchedule}/>*/}
                <Schedules
                  leftButton='delete'
                  validSchedules={this.props.savedSchedules}
                  updateCurrSchedule={this.updateCurrSchedule}
                  currIndex={currSavedScheduleIndex}
                  deleteSchedule={this.deleteSchedule}
                />
              </div>
            }
          </div>
        }

        { !isLoggedIn &&
          <div className="saved-schedules__warning-msg-wrapper">
            <Message warning>
              <h4>Must be logged in to view saved schedules.&nbsp;<Nav to="/login">Login here</Nav>.</h4>
            </Message>
          </div>
        }
        <ToastContainer autoClose={3500}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currSavedScheduleIndex: state.currSavedScheduleIndex,
    selectedTerm: state.selectedTerm,
    savedSchedules: state.savedSchedules,
    refreshSavedSchedule: state.refreshSavedSchedule,
  };
};

export default connect(mapStateToProps)(SavedSchedulesPage);
