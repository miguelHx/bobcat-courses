import { SET_SAVED_SCHEDULES, CLEAR_SAVED_SCHEDULES } from "./actionTypes";


// SET SAVED SCHEDULES
/**
 * @param schedules - an array of schedules
 * @returns {{type: number, payload: *}}
 */
export const setSavedSchedules = (schedules) => {
  return {
    type: SET_SAVED_SCHEDULES,
    payload: schedules,
  };
};

// ClEAR SAVED SCHEDULES
export const clearSavedSchedules = () => {
  return {
    type: CLEAR_SAVED_SCHEDULES,
  };
};
