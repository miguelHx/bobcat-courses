import React from 'react';
import { List } from "semantic-ui-react";
import PropTypes from 'prop-types';

const ScheduleSectionItem = (props) => {
  const { sectionId, sectionName, sectionCRN, sectionTerm } = props;
  return (
    <List.Item>
      <List.Content>
        <List.Header className="center-text" as='h3'>{ sectionId }</List.Header>
        <p className="center-text">
          {`${sectionName} (${sectionCRN})  `}
          <span>
            <a
              target="_blank"
              href={`https://mystudentrecord.ucmerced.edu/pls/PROD/xhwschedule.P_ViewCrnDetail?subjcode=${sectionId.split('-')[0]}&validterm=${sectionTerm}&crn=${sectionCRN}&crsenumb=${sectionId.split('-')[1]}`}
            >
              More Info
            </a>
          </span>
        </p>
      </List.Content>
    </List.Item>
  )
};

ScheduleSectionItem.propTypes = {
  sectionId: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  sectionCRN: PropTypes.string.isRequired,
  sectionTerm: PropTypes.string.isRequired,
};

export default ScheduleSectionItem;