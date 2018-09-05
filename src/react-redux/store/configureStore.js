import { createStore, combineReducers } from 'redux';
import selectedCourseReducer from '../reducers/selectedCourse';


export default () => {
  return createStore(
    combineReducers({
      selectedCourse: selectedCourseReducer
    })
  );
};
