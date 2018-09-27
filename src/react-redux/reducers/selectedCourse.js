import { SET_SELECTED_COURSE, CLEAR_SELECTED_COURSE } from "../actions/actionTypes";

const selectedCourseDefaultState = '';

const selectedCourseReducer = (state = selectedCourseDefaultState, action) => {
  switch (action.type) {
    case SET_SELECTED_COURSE:
      return action.payload;
    case CLEAR_SELECTED_COURSE:
      return action.payload;
    default:
      return state;
  }
};

export default selectedCourseReducer;
