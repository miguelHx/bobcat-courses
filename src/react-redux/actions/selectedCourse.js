import { SET_SELECTED_COURSE, CLEAR_SELECTED_COURSE } from "./actionTypes";


// ADD SELECTED COURSE
export const setSelectedCourse = (course) => {
  return {
    type: SET_SELECTED_COURSE,
    payload: course,
  };
};

// ClEAR SELECTED COURSE
export const clearSelectedCourse = () => {
  return {
    type: CLEAR_SELECTED_COURSE,
    payload: '',
  };
};
