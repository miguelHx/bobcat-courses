import { SET_CURR_SAVED_SCHEDULE_INDEX } from "../actions/actionTypes";

const defaultState = 0;

const currSavedScheduleIndexReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURR_SAVED_SCHEDULE_INDEX:
      return action.payload; // payload should be the index
    default:
      return state;
  }
};

export default currSavedScheduleIndexReducer;
