import { createStore, combineReducers } from 'redux';
import selectedCourseReducer from '../reducers/selectedCourse';
import selectedTermReducer from '../reducers/selectedTerm';


export default () => {
  return createStore(
    combineReducers({
      selectedCourse: selectedCourseReducer,
      selectedTerm: selectedTermReducer,
    })
  );
};
