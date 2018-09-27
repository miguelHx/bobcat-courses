import { createStore, combineReducers } from 'redux';
import selectedCourseReducer from '../reducers/selectedCourse';
import selectedTermReducer from '../reducers/selectedTerm';
import currPlanScheduleIndexReducer from '../reducers/currPlanScheduleIndexReducer';
import currSavedScheduleIndexReducer from '../reducers/currSavedScheduleIndexReducer';


export default () => {
  return createStore(
    combineReducers({
      selectedCourse: selectedCourseReducer,
      selectedTerm: selectedTermReducer,
      currPlanScheduleIndex: currPlanScheduleIndexReducer,
      currSavedScheduleIndex: currSavedScheduleIndexReducer,
    })
  );
};
