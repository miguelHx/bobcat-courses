/*
 * action types​
 */

export const SET_SELECTED_COURSE = 'SET_SELECTED_COURSE';
export const CLEAR_SELECTED_COURSE = 'CLEAR_SELECTED_COURSE';


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
