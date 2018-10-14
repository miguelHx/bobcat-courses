import React from "react";
import { Icon, List } from "semantic-ui-react";

/**
 * This callback function will take care of logging in the user to their microsoft account,
 * saving the short-lived access token, and creating a calendar for them using microsoft's rest api.
 * @param event
 */
const handleMicrosoftCalClick = (event) => {
  console.log("microsoft clicked");
};

const MicrosoftCalListItem = (props) => {
  return (
    <List.Item onClick={handleMicrosoftCalClick}>
      <Icon name='microsoft' size='large' />
      <List.Content>
        <List.Header>Microsoft</List.Header>
      </List.Content>
    </List.Item>
  );
};

export default MicrosoftCalListItem;