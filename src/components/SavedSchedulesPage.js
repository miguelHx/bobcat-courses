import React from 'react';

class SavedSchedulesPage extends React.Component {


  render() {

    // if not logged in, tell user that they must log in to see this page
    // provide them a link to login.
    return (
      <div className="saved-schedules__main-container">
        Saved Schedules will show up here in this page.
      </div>
    );
  }
}

export default SavedSchedulesPage;
