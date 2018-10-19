import React from 'react';
import CustomEvent from './CustomEvent';
import PropTypes from 'prop-types';

const CustomEvents = (props) => {
  return (
    <div>
      {
        props.customEvents.map((customEvent, index) => {
          // course is now an object containing dept AND course text
          return (
            <CustomEvent
              key={`${customEvent.event_name}-${index}`}
              customEventObject={customEvent}
            />
          );
        })
      }
    </div>
  );
};

CustomEvents.propTypes = {
  customEvents: PropTypes.array.isRequired
};


export default CustomEvents;
