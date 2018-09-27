import { SET_CURR_SAVED_SCHEDULE_INDEX } from "./actionTypes";


// Setting the index that we use to access the schedules array
export const setCurrSavedScheduleIndex = (index) => {
  return {
    type: SET_CURR_SAVED_SCHEDULE_INDEX,
    payload: index,
  };
};
