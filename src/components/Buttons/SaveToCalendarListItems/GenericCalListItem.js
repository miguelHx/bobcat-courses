import React from "react";
import {Icon, List} from "semantic-ui-react";

const handleOtherCalClick = (event) => {
  console.log("other clicked");
};

const GenericCalListItem = (props) => {
  return (
    <List.Item onClick={handleOtherCalClick}>
      <Icon name='apple' size='large' />
      <List.Content>
        <List.Header>Apple/Other</List.Header>
      </List.Content>
    </List.Item>
  );
};

export default GenericCalListItem;