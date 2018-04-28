import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
import { extractSectionsFromSchedule } from './../lib/WeeklyCalendarUtils';

// Client ID and API key from the Developer Console
const CLIENT_ID = '753790478110-vqi6frrhbhdnjiosc24l0rr5o4emi8sa.apps.googleusercontent.com';
const GOOGLE_API_KEY = 'AIzaSyDAvu7sm3kERJ73OLAyuFuO3JHdF5xYuqQ';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar";

const NEW_CAL_NAME = 'Bobcat-Courses-Fall2018';

class GoogleCalButton extends React.Component {
  state = {
    events: []
  }

  componentDidMount() {
    // want to load the auth2 library and API client library when this component mounts
    this.handleClientLoad();
  }

  componentWillUnmount() {
    this.handleSignoutClick();
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
      // authorizeButton.onclick = handleAuthClick;
      // signoutButton.onclick = handleSignoutClick;
    });
  };

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      // authorizeButton.style.display = 'none';
      // signoutButton.style.display = 'block';
      this.makeApiCall();
    } else {
      // authorizeButton.style.display = 'block';
      // signoutButton.style.display = 'none';
    }
  };

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
  };

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick = (event) => {
    gapi.auth2.getAuthInstance().signOut();
  };

  makeApiCall = () => {
    // want to create a calendar and then insert a list of events to that calendar from the current schedule


    gapi.client.request({
      'path': 'https://www.googleapis.com/calendar/v3/calendars',
      'method': 'POST',
      'body': {
        summary: NEW_CAL_NAME,
      }
    }).then((response) => {
      console.log("REQUEST RESPONSE FROM GOOGLE: ", response);
      this.handleSignoutClick();
    }).catch((error) => {
      console.log("ERROR: ", error);
      this.handleSignoutClick();
    });

  };

  buildCalendarEvents = () => {
    const sections = extractSectionsFromSchedule(this.props.currSchedule);
  };



  render() {
    return (
      <Button onClick={this.handleAuthClick} color='teal'>+ Google Calendar</Button>
    );
  }
}

export default GoogleCalButton
