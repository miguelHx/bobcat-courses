import { ADD_CUSTOM_EVENT, REMOVE_CUSTOM_EVENT, EDIT_CUSTOM_EVENT } from "../actions/actionTypes";

const defaultState = [];

// a sample event object:
/*
{
  event_name: "cse",
  start_time: 700,
  end_time: 830,
  days: "T",
}
 */

const customEventsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CUSTOM_EVENT:
      return [...state, action.payload]; // payload should be an event object
    case EDIT_CUSTOM_EVENT:
      return action.payload; // payload should be the array
    case REMOVE_CUSTOM_EVENT:
      return defaultState;
    default:
      return state;
  }
};

export default customEventsReducer;
