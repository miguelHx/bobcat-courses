import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { extractSectionsFromSchedule } from './../lib/WeeklyCalendarUtils';
import Schedules from './Schedules';
import AuthService from './AuthService';
import Alert from 'react-s-alert';

const Auth = new AuthService();

const BASE_URL = 'https://cse120-course-planner.herokuapp.com/api';

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
    currScheduleIndex: 0, // for getting correct index of updated schedule after delete.
    savedSchedules: [],
    error: undefined
  };

  componentDidMount() {
    // want to fetch schedule data if user is logged in
    if (this.props.isLoggedIn) {
      axios.get(`${BASE_URL}/users/schedule-dump/`, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
      .then(response => {
        const data = response.data;
        if (data.length === 0) {
          this.setState(() => ({ error: 'No saved schedules.' }));
          return;
        }
        this.setState(() => ({ savedSchedules: data, error: undefined }));
        // console.log(response.data);
      })
      .catch(error => {
        this.setState(() => ({ error: error }));
        // console.log(error);
      });
    }
  }

  deleteSchedule = () => {
    let crns = [];
    const schedule = this.state.currSchedule;
    const sectionsList = extractSectionsFromSchedule(schedule);

    for (let i = 0; i < sectionsList.length; i++) {
      crns.push(sectionsList[i]['crn']);
    }

    let data = JSON.stringify({
        crns: crns,
        term: "201830",
    });

    axios.post(`${BASE_URL}/users/delete-schedule/`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Auth.getToken()}`
        }
    })
    .then(res => {
      // console.log(res.data);
      const responseStatus = res.data;
      let currIdx = this.state.currScheduleIndex;
      const newLength = this.state.savedSchedules.length - 1;
      // on success, delete schedule from local state
      if ('success' in responseStatus) {
        // schedule deleted, so notify user via Alert

        Alert.info(responseStatus['success'], {
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
            this.setState(() => ({
              currScheduleIndex: currIdx
            }));
          }


          // fetch new schedules list after the deletion via api call just like in componentDidMount but with extra checks for index update.
          axios.get(`${BASE_URL}/users/schedule-dump/`, {
            headers: {
              Authorization: `Bearer ${Auth.getToken()}`
            }
          })
          .then(response => {
            const data = response.data;

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
      else if ('error' in responseStatus) {
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
    this.setState(() => ({
      currSchedule: schedule,
      currScheduleIndex: index,
    }));
  };


  render() {
    const { isLoggedIn } = this.props;
    // console.log("[saved schedules state]: ", this.state);
    const { error, currScheduleIndex } = this.state;
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
                <Schedules
                  validSchedules={this.state.savedSchedules}
                  updateCurrSchedule={this.updateCurrSchedule}
                  currIndex={currScheduleIndex}
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

export default SavedSchedulesPage;
