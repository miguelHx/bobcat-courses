import React from 'react';
import { connect } from 'react-redux';
import BobcatCoursesApi from "../../api/BobcatCoursesApi";
import { Button, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { extractSectionsFromSchedule } from '../../utils/WeeklyCalendarUtils';
import GoogleCalButton from '../Buttons/GoogleCalButton';
import Schedules from '../Schedules/Schedules';
import AuthService from '../../login/AuthService';
import Alert from 'react-s-alert';
import { setCurrSavedScheduleIndex } from "../../react-redux/actions/currSavedScheduleIndex";
import './SavedSchedulesPage.css';

const Auth = new AuthService();

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
    savedSchedules: [],
    error: undefined
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      // want to use 'cached' data from current session, only if saved schedules on server hasn't changed
      const tempSavedSchedules = sessionStorage.getItem("tempSavedSchedules");
      if (tempSavedSchedules !== null) {
        this.setState(() => ({
          savedSchedules: JSON.parse(tempSavedSchedules),
        }));
        return;
      }

      // Otherwise, want to fetch schedule data if user is logged in
      BobcatCoursesApi.fetchSavedSchedules(Auth.getToken())
        .then(response => {
        const data = response || [];
        if (data.length === 0) {
          this.setState(() => ({ error: 'No saved schedules.' }));
          return;
        }
        this.setState(() => ({ savedSchedules: data, error: undefined }));
        // console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  componentWillUnmount() {
    // want to save valid schedules (if any) to session storage
    const { savedSchedules } = this.state;
    if (savedSchedules.length > 0) {
      // if schedules are here, might as well update ALL relevant state.
      sessionStorage.setItem("tempSavedSchedules", JSON.stringify(savedSchedules));
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

    BobcatCoursesApi.deleteSavedSchedule(data, Auth.getToken())
      .then(res => {
      console.log(res);
      const responseStatus = res;
      let currIdx = this.props.currSavedScheduleIndex;
      const newLength = this.state.savedSchedules.length - 1;
      // on success, delete schedule from local state
      if (responseStatus['success']) {
        // schedule deleted, so notify user via Alert
        Alert.info("Schedule Deleted.", {
          position: 'top-right',
          offset: 0,
        });


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
          BobcatCoursesApi.fetchSavedSchedules(Auth.getToken())
            .then(response => {
            const data = response;

            this.setState(() => ({
              currSchedule: data[currIdx],
              savedSchedules: data,
              error: undefined
            }));
          })
          .catch(error => {
            Alert.error(error, {
              position: 'top-right',
              offset: 0,
            });
            // console.log(error);
          });
        }

      }
      else {
        // error, schedule probably deleted, update state error Message
        Alert.error(responseStatus['error'], {
          position: 'top-right',
          offset: 0,
        });
      }
    })
    .catch(error => {
      // console.log(error);
      Alert.error(error, {
        position: 'top-right',
        offset: 0,
      });
    });

  };

  updateCurrSchedule = (schedule, index) => {
    this.props.dispatch(setCurrSavedScheduleIndex(index));
    this.setState(() => ({ currSchedule: schedule }));
  };


  render() {
    const { isLoggedIn } = this.props;
    // console.log("[saved schedules state]: ", this.state);
    const { error } = this.state;
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
                            {error} Plan your schedule <Nav to="/">here </Nav>
                            and then click the 'Save Schedule' button.
                          </Message>
                        </div>
            }

            {/* want to add some buttons, for now, just delete schedule button  */}

            {
              this.state.savedSchedules.length > 0 &&
              <div className="saved-schedules__schedules-display">
                <Button onClick={this.deleteSchedule} negative>Delete Schedule</Button>
                <GoogleCalButton currSchedule={this.state.currSchedule}/>
                <Schedules
                  validSchedules={this.state.savedSchedules}
                  updateCurrSchedule={this.updateCurrSchedule}
                  currIndex={currSavedScheduleIndex}
                />
              </div>
            }
          </div>
        }

        { !isLoggedIn &&
          <div className="saved-schedules__warning-msg-wrapper">
            <Message warning>
              Must be logged in to view saved schedules.&nbsp;<Nav to="/login">Login here</Nav>.
            </Message>
          </div>
        }

        <Alert stack={{limit: 2}} timeout={2000} />
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    currSavedScheduleIndex: state.currSavedScheduleIndex,
    selectedTerm: state.selectedTerm,
  };
};

export default connect(mapStateToProps)(SavedSchedulesPage);
