import React from "react";
import {Icon, List} from "semantic-ui-react";
import gapi from 'gapi-client';

class GoogleCalListItem extends React.Component {

  constructor(props) {
    super(props);
    this.GoogleAuth = null;
    this.isAuthorized = false;
    this.currentApiRequest = {};
  }

  componentDidMount() {
    gapi.load('client:auth2', this.initClient);
  }

  componentWillUnmount() {
    if (this.GoogleAuth) {
      this.revokeAccess();
    }
  }

  initClient = () => {
    gapi.client.init({
      'clientId': '219116220037-uu341rn3io8hlmcohsdncs3q82re8vjo.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    }).then(() => {
      this.GoogleAuth = gapi.auth2.getAuthInstance();

      // listen for sign-in state changes
      this.GoogleAuth.isSignedIn.listen(this.updateSignInStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      let user = this.GoogleAuth.currentUser.get();
      // this.setSignInStatus();

    })
  };

  handleGoogleCalClick = () => {
    if (this.GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked 'sign out' button.
      this.GoogleAuth.signOut();
    }
    else {
      // User is not signed in.  Start Google auth flow
      this.GoogleAuth.signIn();
    }
  };

  revokeAccess = () => {
    this.GoogleAuth.disconnect();
  };

  sendAuthorizedApiRequest = (requestDetails) => {
    this.currentApiRequest = requestDetails;
    if (this.isAuthorized) {
      // Make API request
      // gapi.client.request(requestDetails)

      // Example 2: Use gapi.client.request(args) function
      let request = gapi.client.request({
        'method': 'GET',
        'path': '/drive/v3/about',
        'params': {'fields': 'user'}
      });
      // Execute the API request.
      request.execute((response) => {
        console.log(response);
      });

      // Reset currentApiRequest variable
      this.currentApiRequest = {};
    }
    else {
      this.GoogleAuth.signIn();
    }
  };

  /**
   * Listener called when user completes auth flow.  If the currentApiRequest
   * variable is set, then the user was prompted to authorize the application
   * before the request executed.  In that case, proceed with that API request.
   * @param isSignedIn
   */
  updateSignInStatus = (isSignedIn) => {



    if (isSignedIn) {
      this.isAuthorized = true;
      if (this.currentApiRequest) {
        this.sendAuthorizedApiRequest(this.currentApiRequest);
      }
    }
    else {
      this.isAuthorized = false;
    }
  };

  render() {
    return (
      <List.Item onClick={this.handleGoogleCalClick}>
        <Icon name='google' size='large' />
        <List.Content>
          <List.Header>Google</List.Header>
        </List.Content>
      </List.Item>
    );
  }
}

export default GoogleCalListItem;