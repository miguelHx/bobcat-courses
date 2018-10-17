import { createStore, combineReducers } from 'redux';
import selectedCourseReducer from '../reducers/selectedCourse';
import selectedTermReducer from '../reducers/selectedTerm';
import currPlanScheduleIndexReducer from '../reducers/currPlanScheduleIndexReducer';
import currSavedScheduleIndexReducer from '../reducers/currSavedScheduleIndexReducer';
import savedSchedulesReducer from '../reducers/savedSchedulesReducer';
import refreshSavedScheduleReducer from '../reducers/refreshSavedScheduleReducer';


export default () => {
  return createStore(
    combineReducers({
      selectedCourse: selectedCourseReducer,
      selectedTerm: selectedTermReducer,
      currPlanScheduleIndex: currPlanScheduleIndexReducer,
      currSavedScheduleIndex: currSavedScheduleIndexReducer,
      savedSchedules: savedSchedulesReducer,
      refreshSavedSchedule: refreshSavedScheduleReducer,
    })
  );
};
