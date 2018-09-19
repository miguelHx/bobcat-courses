import { SET_CURR_PLAN_SCHEDULE_INDEX } from "../actions/actionTypes";

const defaultState = 0;

const currPlanScheduleIndexReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURR_PLAN_SCHEDULE_INDEX:
      return action.payload; // payload should be the index
    default:
      return state;
  }
};

export default currPlanScheduleIndexReducer;
