/* global gapi */

import React from 'react';
import Alert from 'react-s-alert';
import { Button } from 'semantic-ui-react';
import { MONTH_TABLE } from '../../utils/MonthLookupTable';
import { DAY_TABLE } from "../../utils/DayTableLookup";
import { extractSectionsFromSchedule, convertTimeStringTo24 } from '../../utils/WeeklyCalendarUtils';
import { getMon, getTue, getWed, getThu, getFri } from '../../utils/DayOfWeekFinder';

// Client ID and API key from the Developer Console
const CLIENT_ID = '753790478110-vqi6frrhbhdnjiosc24l0rr5o4emi8sa.apps.googleusercontent.com';
const GOOGLE_API_KEY = 'AIzaSyDAvu7sm3kERJ73OLAyuFuO3JHdF5xYuqQ';
const BASE_API_URL = 'https://www.googleapis.com/calendar/v3/calendars';
// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar";

const NEW_CAL_NAME = 'Bobcat-Courses-Fall2018';
const TERM_YEAR = '2018'; // static for now

class GoogleCalButton extends React.Component {
  state = {
    isSignedInToGoogle: false,
    buttonClicked: false,
  };

  componentDidMount() {
    // want to load the auth2 library and API client library when this component mounts
    this.handleClientLoad();
  }
  componentWillUnmount() {
    this.handleSignoutClick();
  }

  render() {
    // returning array (React fragment, feature in react 16.0.0)
    return (
      [
        <Button key='btn' onClick={this.handleAuthClick} color='teal'>+ Google Calendar</Button>,
        <Alert key='alert' stack={{limit: 2}} timeout={5000} />
      ]
    );
  }
  /**
   *  On load, called to load the auth2 library and API client library.
   */
  handleClientLoad = () => {
    gapi.load('client:auth2', this.initClient);
  };

  initClient = () => {
    gapi.client.init({
      apiKey: GOOGLE_API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  };

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  updateSigninStatus = (isSignedIn) => {
    this.setState(() => ({ isSignedInToGoogle: isSignedIn }));
    if (isSignedIn && this.state.buttonClicked) {
      this.makeApiCall();
    }
    this.setState(() => ({ buttonClicked: false })); // reset button clicked state
  };

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick = (event) => {
    if (this.state.isSignedInToGoogle) {
      this.makeApiCall();
    }
    else {
      this.setState(() => ({ buttonClicked: true }));
      gapi.auth2.getAuthInstance().signIn();
    }
  };

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick = (event) => {
    gapi.auth2.getAuthInstance().signOut();
  };

  /**
   * Make a call to the google calendar api. First create a calendar, get the calendar id, then make events batched up in addEventsToCalendar
   */
  makeApiCall = () => {
    // want to create a calendar and then insert a list of events to that calendar from the current schedule
    gapi.client.request({
      'path': BASE_API_URL,
      'method': 'POST',
      'body': {
        summary: NEW_CAL_NAME,
      }
    }).then((response) => {
      Alert.success(`Calendar created: ${response['result']['summary']}`, {
        position: 'top-right',
        offset: 0,
        timeout: 'none',
      });
      this.addEventsToCalendar(response.result.id);
    }).catch((error) => {
      Alert.error(`Google ${error['result']['error']['message']}`, {
        position: 'top-right',
        offset: 0,
        timeout: 'none',
      });
      this.handleSignoutClick();
    });
  };

  addEventsToCalendar = (calendarId) => {
    const sections = extractSectionsFromSchedule(this.props.currSchedule);
    const defaultTimezone = 'America/Los_Angeles';
    const timezoneAdjust = '07:00'; // -07:00 is timezone adjustment

    let batch = gapi.client.newBatch(); // want to batch multiple insert event requests

    let map = Array.prototype.map; // for calling .map on string

    for (let i = 0; i < sections.length; i++) {
      let currSection = sections[i];
      let summary = currSection['course_id'];
      let location = currSection['room'];
      let description = currSection['course_name'];
      let startMonth = MONTH_TABLE[currSection['dates'].split(' ')[0].split('-')[1]];
      let startDay = parseInt(currSection['dates'].split(' ')[0].split('-')[0], 10);
      let timeTo24 = convertTimeStringTo24(currSection['hours']); // will receive time in 24 hour format
      let startTime;

      if (timeTo24.split('-')[0].length < 5) {
        // pad with leading 0, because we have 9:30 rather than 09:30
        startTime = `0${timeTo24.slice(0, 4)}:00`;
        timeTo24 = `0${timeTo24}`; // also pad timeTo24 to avoid off by one error below in endTime slice
      }
      else {
        startTime = `${timeTo24.slice(0, 5)}:00`;
      }
      let endTime;
      if (timeTo24.split('-')[1].length < 5) {
        endTime = `0${timeTo24.slice(5, timeTo24.length)}:00`;
      }
      else {
        endTime = `${timeTo24.slice(6, timeTo24.length)}:00`;
      }
      let days = map.call(currSection['days'], (str) => {
        return DAY_TABLE[str.charAt(0)];
      });
      days = days.join(','); // convert from array to comma separated string for google cal recurrence rule
      // need to get correct date using day of week.
      let currSectStartDate = new Date(`${TERM_YEAR}-${startMonth}-${startDay}T${startTime}-${timezoneAdjust}`);
      startDay = this.getDateWithDayofWeekOffset(currSectStartDate, currSection['days'][0]);
      let start = {
        'dateTime': `${TERM_YEAR}-${startMonth}-${startDay}T${startTime}-${timezoneAdjust}`,
        'timeZone': defaultTimezone,
      };
      let end = {
        'dateTime': `${TERM_YEAR}-${startMonth}-${startDay}T${endTime}-${timezoneAdjust}`,
        'timeZone': defaultTimezone,
      };

      let testEvent = {
        summary: summary,
        location: location,
        description: description,
        start: start,
        end: end,
        recurrence: [
          `RRULE:FREQ=WEEKLY;BYDAY=${days};COUNT=${currSection['days'].length * 17}`,// COUNT is by # of events, not number of weeks
        ],
        'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'popup', 'minutes': 30 }
              ]
        }
      };
      // finally, after putting together the event data, we can add the request to the batch
      batch.add(gapi.client.request({
        'path': `${BASE_API_URL}/${calendarId}/events`,
        'method': 'POST',
        'body': testEvent,
      }));
    }
    batch.execute(this.batchCallBack);
  };

  batchCallBack = (responseMap, rawBatchResponse) => {
    // Want to alert success or failure.
    if (rawBatchResponse.indexOf('error') >= 0) {
      Alert.error('Unable to create events. Please try again later.', {
        position: 'top-right',
        offset: 0,
      });
    }
    else {
      Alert.success('Events created successfully. Check google calendar.', {
        position: 'top-right',
        offset: 0,
      });
      // sign out after finishing.
      this.handleSignoutClick();
    }
  };

  getDateWithDayofWeekOffset = (dateOfInterest, dayOfWeek) => {
    switch (dayOfWeek) {
      case 'M':
        return getMon(dateOfInterest).getDate();
      case 'T':
        return getTue(dateOfInterest).getDate();
      case 'W':
        return getWed(dateOfInterest).getDate();
      case 'R':
        return getThu(dateOfInterest).getDate();
      case 'F':
        return getFri(dateOfInterest).getDate();
      default:
        return 1;
    }
  };
}

export default GoogleCalButton
