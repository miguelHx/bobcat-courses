import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Message } from 'semantic-ui-react';
import { extractSectionsFromSchedule } from './../lib/WeeklyCalendarUtils';
import Schedules from './Schedules';
import AuthService from './AuthService';

const Auth = new AuthService();

const BASE_URL = 'https://cse120-course-planner.herokuapp.com/api';

class SavedSchedulesPage extends React.Component {

  state = {
    currSchedule: {},
    currScheduleIndex: 0,
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
          this.setState(() => ({ error: 'No saved schedules. Please save a schedule and then come back.' }));
          return;
        }
        this.setState(() => ({ savedSchedules: data }));
        console.log(response.data);
      })
      .catch(error => {
        this.setState(() => ({ error: error }));
        console.log(error);
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
      console.log(res.data);
      const responseStatus = res.data;
      const currIdx = this.state.currScheduleIndex;
      const newLength = this.state.savedSchedules.length - 1;
      // on success, delete schedule from local state
      if ('success' in responseStatus) {
        // schedule deleted, so update state accordingly
        if (newLength === 0) {
          this.setState(() => ({
            savedSchedules: [],
            error: 'No saved schedules. Please save a schedule and then come back.'
          }));
        }
        else {
          // fetch new schedules list after the deletion
          axios.get(`${BASE_URL}/users/schedule-dump/`, {
            headers: {
              Authorization: `Bearer ${Auth.getToken()}`
            }
          })
          .then(response => {
            const data = response.data;
            if (data.length === 0) {
              this.setState(() => ({ error: 'No saved schedules. Please save a schedule and then come back.' }));
              return;
            }
            this.setState(() => ({ savedSchedules: data, currScheduleIndex: 0 }));
            console.log(response.data);
          })
          .catch(error => {
            this.setState(() => ({ error: error }));
            console.log(error);
          });
        }

      }
      else if ('error' in responseStatus) {
        // error, schedule probably deleted, update state error Message
        this.setState(() => ({ error: responseStatus['error'] }));
      }
    })
    .catch(error => {
      console.log(error);
      this.setState(() => ({ error: error }));
    });

  };

  updateCurrSchedule = (schedule, index) => {
    this.setState(() => ({
      currSchedule: schedule,
      currScheduleIndex: index,
    }));
  };


  render() {
    console.log(this.state);
    const { error } = this.state;
    // if not logged in, tell user that they must log in to see this page
    // provide them a link to login.
    if (!this.props.isLoggedIn) {
      return <div>Please Log in to view this page.</div>;
    }
    // if user is logged in AND has saved some schedules, then render schedules onto screen along with options.
    return (
      // add a better layout
      <div className="saved-schedules__main-container">
        { error && <Message negative>Error message: {error}</Message> }

        {/* want to add some buttons, for now, just delete schedule button  */}

        {
          this.state.savedSchedules.length > 0 &&
          <div>
            <Button onClick={this.deleteSchedule} negative>Delete Schedule</Button>
            <Schedules
              validSchedules={this.state.savedSchedules}
              updateCurrSchedule={this.updateCurrSchedule}
              currIndex={this.state.currScheduleIndex}
            />
          </div>
        }

      </div>

    );
  }
}

export default SavedSchedulesPage;
