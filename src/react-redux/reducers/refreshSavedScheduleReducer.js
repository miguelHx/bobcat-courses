
import { UPDATE_REFRESH_BOOLEAN } from "../actions/actionTypes";

const defaultState = false;

const refreshSavedScheduleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_REFRESH_BOOLEAN:
      return action.payload; // payload should be a boolean value
    default:
      return state;
  }
};

export default refreshSavedScheduleReducer;
