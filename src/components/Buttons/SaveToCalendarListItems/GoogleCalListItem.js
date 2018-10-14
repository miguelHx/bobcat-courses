import React from "react";
import {Icon, List} from "semantic-ui-react";

const handleGoogleCalClick = (event) => {
  console.log("google clicked");
};

const GoogleCalListItem = (props) => {
  return (
    <List.Item onClick={handleGoogleCalClick}>
      <Icon name='google' size='large' />
      <List.Content>
        <List.Header>Google</List.Header>
      </List.Content>
    </List.Item>
  );
};

export default GoogleCalListItem;