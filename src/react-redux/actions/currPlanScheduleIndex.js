import { SET_CURR_PLAN_SCHEDULE_INDEX } from "./actionTypes";


// Setting the index that we use to access the schedules array
export const setCurrPlanScheduleIndex = (index) => {
  return {
    type: SET_CURR_PLAN_SCHEDULE_INDEX,
    payload: index,
  };
};
