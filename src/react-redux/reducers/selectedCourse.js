import { ADD_SELECTED_COURSE, CLEAR_SELECTED_COURSE } from "../actions/selectedCourse";

const selectedCourseReducerDefaultState = '';

const selectedCourseReducer = (state = selectedCourseReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_SELECTED_COURSE:
      return action.payload;
    case CLEAR_SELECTED_COURSE:
      return action.payload;
    default:
      return state;
  }
};

export default selectedCourseReducer;
