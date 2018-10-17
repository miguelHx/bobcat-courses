import { UPDATE_REFRESH_BOOLEAN } from "./actionTypes";

// purpose of this is to update the saved schedules 'cached' when user goes back
// to plan schedule and saves a new schedule.
export const updateRefreshSavedScheduleBoolean = (b) => {
  return {
    type: UPDATE_REFRESH_BOOLEAN,
    payload: b,
  };
};
