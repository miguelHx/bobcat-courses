/*
 * action types​
 */

export const ADD_SELECTED_COURSE = 'ADD_SELECTED_COURSE';
export const CLEAR_SELECTED_COURSE = 'CLEAR_SELECTED_COURSE';


// ADD SELECTED COURSE
export const addSelectedCourse = (course) => {
  return {
    type: ADD_SELECTED_COURSE,
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


