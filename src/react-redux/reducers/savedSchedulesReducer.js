import { SET_SAVED_SCHEDULES, CLEAR_SAVED_SCHEDULES } from "../actions/actionTypes";

const defaultState = [];

const savedSchedulesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SAVED_SCHEDULES:
      return action.payload; // payload should be the array
    case CLEAR_SAVED_SCHEDULES:
      return defaultState;
    default:
      return state;
  }
};

export default savedSchedulesReducer;
