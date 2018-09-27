import { SET_SELECTED_TERM } from "./actionTypes";


// ADD SELECTED COURSE
export const setSelectedTerm = (text, value) => {
  // format for term is: { text: 'Term', value: 201810 }
  return {
    type: SET_SELECTED_TERM,
    payload: { text: text, value: value },
  };
};

