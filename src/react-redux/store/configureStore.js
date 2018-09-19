import { createStore, combineReducers } from 'redux';
import selectedCourseReducer from '../reducers/selectedCourse';
import selectedTermReducer from '../reducers/selectedTerm';
import currPlanScheduleIndexReducer from '../reducers/currPlanScheduleIndexReducer';


export default () => {
  return createStore(
    combineReducers({
      selectedCourse: selectedCourseReducer,
      selectedTerm: selectedTermReducer,
      currPlanScheduleIndex: currPlanScheduleIndexReducer,
    })
  );
};
