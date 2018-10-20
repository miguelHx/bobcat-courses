import React from 'react';
import { List, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { extractSectionsFromSchedule } from "../../../utils/WeeklyCalendarUtils";
import ScheduleSectionItem from './ScheduleSectionItem';
import './ScheduleSectionsList.css';

const renderSectionListItems = (sections) => {
  return (
    sections.map((section, index) => {
      return (
        <ScheduleSectionItem
          key={`${section['crn']}-${index}`}
          sectionId={section['course_id']}
          sectionName={section['course_name']}
          sectionCRN={section['crn']}
          sectionTerm={section['term']}
        />
      );
    })
  );
};

const renderCRNS = (sections) => {
  return (
    <List.Item>
      <List.Content>
        <List.Header className="center-text" as='h3'>CRNs</List.Header>
        <p className="center-text">
          {
            sections.reverse().map((section, index) => {
              if (index === sections.length-1) {
                return <span key={index}>{section['crn']}</span>
              }
              return <span key={index}>{section['crn']}, </span>
            })
          }
        </p>
      </List.Content>
    </List.Item>
  );
};

const ScheduleSectionsList = (props) => {
  const { currSchedule } = props;
  const sections = extractSectionsFromSchedule(currSchedule);
  return (
    <Segment className="schedule-sections-list">
      <List divided relaxed>
        { renderSectionListItems(sections) }
        { renderCRNS(sections) }
      </List>
    </Segment>
  );
};

ScheduleSectionsList.propTypes = {
  currSchedule: PropTypes.shape({
    custom_events: PropTypes.array,
    info: PropTypes.shape({
      earliest: PropTypes.number,
      gaps: PropTypes.number,
      latest: PropTypes.number,
      number_of_days: PropTypes.number,
    }),
    schedule: PropTypes.object,
  }).isRequired
};

export default ScheduleSectionsList;